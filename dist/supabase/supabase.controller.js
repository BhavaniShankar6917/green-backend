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
const supabase_service_1 = require("./supabase.service");
const signup_dto_1 = require("./dtos/signup-dto");
let SupabaseController = class SupabaseController {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async sayHelloWorld(body) {
        let { data, error } = await this.supabaseService.supabase.auth.signUp({ email: body.email, password: body.password, phone: body.phone });
        if (data) {
            console.log(data);
            return data;
        }
        if (error) {
            return error;
        }
    }
};
exports.SupabaseController = SupabaseController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], SupabaseController.prototype, "sayHelloWorld", null);
exports.SupabaseController = SupabaseController = __decorate([
    (0, common_1.Controller)('supabase'),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], SupabaseController);
//# sourceMappingURL=supabase.controller.js.map