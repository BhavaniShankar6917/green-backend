"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseModule = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("./supabase.service");
const supabase_controller_1 = require("./supabase.controller");
const posts_controller_1 = require("./posts/posts.controller");
const comments_controller_1 = require("./comments/comments.controller");
const likes_controller_1 = require("./likes/likes.controller");
const people_controller_1 = require("./people/people.controller");
const sharp_service_1 = require("./sharp/sharp.service");
let SupabaseModule = class SupabaseModule {
};
exports.SupabaseModule = SupabaseModule;
exports.SupabaseModule = SupabaseModule = __decorate([
    (0, common_1.Module)({
        providers: [supabase_service_1.SupabaseService, sharp_service_1.SharpService],
        controllers: [supabase_controller_1.SupabaseController, posts_controller_1.PostsController, comments_controller_1.CommentsController, likes_controller_1.LikesController, people_controller_1.PeopleController]
    })
], SupabaseModule);
//# sourceMappingURL=supabase.module.js.map