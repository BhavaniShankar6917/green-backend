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
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase.service");
const newcomment_dto_1 = require("../dtos/newcomment-dto");
let CommentsController = class CommentsController {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async addComment(req, res, body) {
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
    async retrievePostComments(req, res, params) {
        let { data, error, status, statusText } = await this.supabaseService.supabase
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
    async getRepliesForComments(req, res) {
        await this.supabaseService
            .createServerClient({ req, res })
            .from("comments")
            .select("id,likes,comment,comment_id")
            .eq("comment_id", "");
    }
};
exports.CommentsController = CommentsController;
__decorate([
    (0, common_1.Post)("/add"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, newcomment_dto_1.NewCommentDto]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "addComment", null);
__decorate([
    (0, common_1.Get)(":post_id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "retrievePostComments", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "getRepliesForComments", null);
exports.CommentsController = CommentsController = __decorate([
    (0, common_1.Controller)("comments"),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], CommentsController);
//# sourceMappingURL=comments.controller.js.map