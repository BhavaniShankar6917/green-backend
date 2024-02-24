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
import { Response, Request } from "express";
import { SupabaseService } from "../supabase.service";
import { NewCommentDto } from "../dtos/newcomment-dto";

@Controller("comments")
export class CommentsController {
  constructor(private supabaseService: SupabaseService) {}
  @Post("/add")
  async addComment(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: NewCommentDto
  ) {
    let { data, error, status, statusText } = await this.supabaseService
      .createServerClient({ req, res })
      .from("comments")
      .insert(body);
    if (data) {
      res.status(status).send("Comment added successfully");
      return;
    }
    if (error) {
      res.status(status).send(error);
      return;
    }
  }

  @Get(":post_id")
  async retrievePostComments(
    @Req() req: Request,
    @Res() res: Response,
    @Param() params: any
  ) {
    let { data, error, status, statusText } =
      await this.supabaseService.supabase
        .from("comments")
        .select("id,likes,comment,comment_id")
        .eq("post_id", params.post_id);
    if (data) {
      res.status(status).send(data);
      return;
    }
    if (error) {
      res.status(status).send(error);
      return;
    }
  }

  async getRepliesForComments(@Req() req: Request, @Res() res: Response) {
    await this.supabaseService
      .createServerClient({ req, res })
      .from("comments")
      .select("id,likes,comment,comment_id")
      .eq("comment_id", "");
  }
}
