import {
  Controller,
  Get,
  Req,
  Post,
  Res,
  Body,
  HttpStatus,
  Header,
  Param,
} from "@nestjs/common";
import * as fs from "node:fs";
import { SupabaseService } from "../supabase.service";
import { SharpService } from "../sharp/sharp.service";
import { Response, Request } from "express";
import { NewPostDto } from "../dtos/newpost-dto";
import { Blob } from "node:buffer";
import { buffer } from "stream/consumers";
import { Session } from "@supabase/supabase-js";
@Controller("posts")
export class PostsController {
  constructor(
    private supabaseService: SupabaseService,
    private sharpService: SharpService
  ) {}
  // r: Buffer;
  publicUrl: string;
  @Post("/add")
  @Header("Access-Control-Allow-Credentials", "true")
  @Header("Access-Control-Allow-Origin", "http://localhost:4200")
  @Header("content-type", "application/json")
  async addNewPost(
    @Body() body: NewPostDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    let { data, error } = await this.supabaseService
      .createServerClient({ req, res })
      .auth.getSession();
    if (data) {
      console.log("Session identified!");
      let fileFormat = body.image.substring(
        body.image.indexOf("/") + 1,
        body.image.indexOf(";")
      );

      let originalFileName = `original_${Math.round(
        Math.random() * 100000000
      )}.${fileFormat}`;
      let resizedFileName = `resized_${Math.round(
        Math.random() * 100000000
      )}.${fileFormat}`;

      //gets only the data part of base64 URL
      let imageDataFromBase64URL = body.image.substring(
        body.image.indexOf(",") + 1
      );

      fs.writeFile(
        originalFileName,
        imageDataFromBase64URL,
        { encoding: "base64" },
        async (e) => {
          //calls sharp service to resize image
          console.log("Original file created!");
          let resized = await this.sharpService.resizeImage(
            fileFormat,
            originalFileName,
            resizedFileName
          );
          if (resized) {
            //reads the resized file to upload to supabase storage
            fs.readFile(resizedFileName, async (e, d) => {
              if (d) {
                //uploads to supabase storage
                let uploadedImage =
                  await this.supabaseService.uploadImageToStorage(
                    "posts",
                    resizedFileName,
                    fileFormat,
                    d.buffer
                  );
                console.log("Image uploaded: ", uploadedImage.data);
                //Image is uploaded to storage
                //calls supabase service and gets the public url
                if (uploadedImage.data) {
                  this.publicUrl = await this.supabaseService.getPublicUrl(
                    uploadedImage.data.path
                  );

                  //adds post to database after getting the url
                  await this.supabaseService.addPost(
                    body.caption,
                    this.publicUrl,
                    data.session.user.id
                  );
                  fs.unlink(originalFileName, (e) => {
                    console.log("Deleted original file ", e);
                  });
                  fs.unlink(resizedFileName, (e) => {
                    console.log("Deleted resized file ", e);
                  });
                }
                if (uploadedImage.error) {
                  res
                    .status(HttpStatus.BAD_REQUEST)
                    .send({ error: "Image file size too large" });
                  res.statusMessage = "Image file size too large";
                  res.end();
                  fs.unlink(originalFileName, (e) => {
                    console.log("Deleted original file ", e);
                  });
                  fs.unlink(resizedFileName, (e) => {
                    console.log("Deleted resized file ", e);
                  });
                }
              }
              if (e) {
                console.log(e);
              }
            });
          }
        }
      );
    }
    if (error) {
      res.status(HttpStatus.UNAUTHORIZED);
      res.send(error).end();
      return error;
    }
  }

  @Get("/feed")
  async getFeed(@Req() req: Request, @Res() res: Response) {
    let { data, error } = await this.supabaseService
      .createServerClient({ req, res })
      .auth.getSession();
    if (data) {
      let following = (
        await this.supabaseService.supabase
          .from("people")
          .select("following")
          .eq("follower", data.session.user.id)
      ).data;
      let mappedFollowingData = following.map((item) => item.following);
      let posts = (
        await this.supabaseService.supabase
          .from("posts")
          .select("id,caption,photo_url,created_at,likes")
          .in("user_id", mappedFollowingData)
          .order("created_at", { ascending: true })
          .order("likes", { ascending: false })
      ).data;
      let mappedPostIds = posts.map((post) => post.id);
      let comments = (
        await this.supabaseService.supabase
          .from("comments")
          .select("id,comment,created_at,post_id,comment_id,likes")
          .in("post_id", mappedPostIds)
          .order("created_at", { ascending: true })
          .order("likes", { ascending: false })
      ).data;
      res.send({ posts, comments });
      res.status(HttpStatus.OK);
      res.end();
    }
    if (error) {
      res.send(HttpStatus.FORBIDDEN).send(error);
      res.end();
    }

    // await this.supabaseService.createServerClient({req, res}).from("posts").select("caption,photo_url,created_at,likes")
  }

  @Get("/:user")
  async getPostsOfOneUser(
    @Req() req: Request,
    @Res() res: Response,
    @Param() params: any
  ) {
    let { data, error, status } = await this.supabaseService.supabase
      .from("posts")
      .select("id,caption,photo_url,created_at,likes")
      .filter("user_id", "eq", params.user);
    if (data) {
      let mappedIds = data.map((post) => post.id);
      let comments = (
        await this.supabaseService.supabase
          .from("comments")
          .select("*")
          .in("post_id", mappedIds)
      ).data;
      res.status(status);
      res.send({ posts: data, comments: comments });
      return data;
    }
    if (error) {
      res.status(status).send(error);
      return error;
    }
  }
}
