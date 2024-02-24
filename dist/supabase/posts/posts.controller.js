"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const fs = require("node:fs");
const supabase_service_1 = require("../supabase.service");
const sharp_service_1 = require("../sharp/sharp.service");
const newpost_dto_1 = require("../dtos/newpost-dto");
let PostsController = class PostsController {
    constructor(supabaseService, sharpService) {
        this.supabaseService = supabaseService;
        this.sharpService = sharpService;
    }
    async addNewPost(body, req, res) {
        let { data, error } = await this.supabaseService
            .createServerClient({ req, res })
            .auth.getSession();
        if (data) {
            console.log("Session identified!");
            let fileFormat = body.image.substring(body.image.indexOf("/") + 1, body.image.indexOf(";"));
            let originalFileName = `original_${Math.round(Math.random() * 100000000)}.${fileFormat}`;
            let resizedFileName = `resized_${Math.round(Math.random() * 100000000)}.${fileFormat}`;
            let imageDataFromBase64URL = body.image.substring(body.image.indexOf(",") + 1);
            fs.writeFile(originalFileName, imageDataFromBase64URL, { encoding: "base64" }, async (e) => {
                console.log("Original file created!");
                let resized = await this.sharpService.resizeImage(fileFormat, originalFileName, resizedFileName);
                if (resized) {
                    fs.readFile(resizedFileName, async (e, d) => {
                        if (d) {
                            let uploadedImage = await this.supabaseService.uploadImageToStorage("posts", resizedFileName, fileFormat, d.buffer);
                            console.log("Image uploaded: ", uploadedImage.data);
                            if (uploadedImage.data) {
                                this.publicUrl = await this.supabaseService.getPublicUrl(uploadedImage.data.path);
                                await this.supabaseService.addPost(body.caption, this.publicUrl, data.session.user.id);
                                fs.unlink(originalFileName, (e) => {
                                    console.log("Deleted original file ", e);
                                });
                                fs.unlink(resizedFileName, (e) => {
                                    console.log("Deleted resized file ", e);
                                });
                            }
                            if (uploadedImage.error) {
                                res
                                    .status(common_1.HttpStatus.BAD_REQUEST)
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
            });
        }
        if (error) {
            res.status(common_1.HttpStatus.UNAUTHORIZED);
            res.send(error).end();
            return error;
        }
    }
    async getFeed(req, res) {
        let { data, error } = await this.supabaseService
            .createServerClient({ req, res })
            .auth.getSession();
        if (data) {
            let following = (await this.supabaseService.supabase
                .from("people")
                .select("following")
                .eq("follower", data.session.user.id)).data;
            let mappedFollowingData = following.map((item) => item.following);
            let posts = (await this.supabaseService.supabase
                .from("posts")
                .select("id,caption,photo_url,created_at,likes")
                .in("user_id", mappedFollowingData)
                .order("created_at", { ascending: true })
                .order("likes", { ascending: false })).data;
            let mappedPostIds = posts.map((post) => post.id);
            let comments = (await this.supabaseService.supabase
                .from("comments")
                .select("id,comment,created_at,post_id,comment_id,likes")
                .in("post_id", mappedPostIds)
                .order("created_at", { ascending: true })
                .order("likes", { ascending: false })).data;
            res.send({ posts, comments });
            res.status(common_1.HttpStatus.OK);
            res.end();
        }
        if (error) {
            res.send(common_1.HttpStatus.FORBIDDEN).send(error);
            res.end();
        }
    }
    async getPostsOfOneUser(req, res, params) {
        let { data, error, status } = await this.supabaseService.supabase
            .from("posts")
            .select("id,caption,photo_url,created_at,likes")
            .filter("user_id", "eq", params.user);
        if (data) {
            let mappedIds = data.map((post) => post.id);
            let comments = (await this.supabaseService.supabase
                .from("comments")
                .select("*")
                .in("post_id", mappedIds)).data;
            res.status(status);
            res.send({ posts: data, comments: comments });
            return data;
        }
        if (error) {
            res.status(status).send(error);
            return error;
        }
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Post)("/add"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("content-type", "application/json"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [newpost_dto_1.NewPostDto, Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "addNewPost", null);
__decorate([
    (0, common_1.Get)("/feed"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getFeed", null);
__decorate([
    (0, common_1.Get)("/:user"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPostsOfOneUser", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)("posts"),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService,
        sharp_service_1.SharpService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map