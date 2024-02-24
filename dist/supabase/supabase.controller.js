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
exports.SupabaseController = void 0;
const common_1 = require("@nestjs/common");
const signup_dto_1 = require("./dtos/signup-dto");
const supabase_service_1 = require("./supabase.service");
let SupabaseController = class SupabaseController {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async signInWithPhoneOrEmailAndPassword(body, req, res) {
        let { data, error } = await this.supabaseService
            .createServerClient({ req, res })
            .auth.signInWithPassword({
            email: body.email,
            password: body.password,
            phone: body.phone,
        });
        if (data) {
            res.status(common_1.HttpStatus.CREATED).send(data);
            return res;
        }
        if (error) {
            res.status(common_1.HttpStatus.BAD_REQUEST).send(error);
            return error;
        }
    }
    async getSession(req, res) {
        let { data, error } = await this.supabaseService
            .createServerClient({ req, res })
            .auth.getSession();
        if (data) {
            res.status(common_1.HttpStatus.ACCEPTED).send(data);
            return data;
        }
        if (error) {
            res.status(common_1.HttpStatus.NO_CONTENT).send(error);
        }
    }
    async signupWithEmail(body, req, res) {
        let { data, error } = await this.supabaseService
            .createServerClient({ req, res })
            .auth.signUp({
            email: body.email,
            password: body.password,
            phone: body.phone,
        });
        if (data) {
            res.status(common_1.HttpStatus.CREATED).send(data);
            return res;
        }
        if (error) {
            res.status(common_1.HttpStatus.BAD_REQUEST).send(error);
            return error;
        }
    }
};
exports.SupabaseController = SupabaseController;
__decorate([
    (0, common_1.Post)("/signin"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("content-type", "application/json"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto, Object, Object]),
    __metadata("design:returntype", Promise)
], SupabaseController.prototype, "signInWithPhoneOrEmailAndPassword", null);
__decorate([
    (0, common_1.Get)("session"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SupabaseController.prototype, "getSession", null);
__decorate([
    (0, common_1.Post)("signup"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto, Object, Object]),
    __metadata("design:returntype", Promise)
], SupabaseController.prototype, "signupWithEmail", null);
exports.SupabaseController = SupabaseController = __decorate([
    (0, common_1.Controller)("supabase"),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], SupabaseController);
//# sourceMappingURL=supabase.controller.js.map