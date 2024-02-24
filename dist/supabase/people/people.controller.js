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
exports.PeopleController = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase.service");
let PeopleController = class PeopleController {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async retrieveFollowing(req, res) {
        this.supabaseService.supabase.from("people").select("");
    }
};
exports.PeopleController = PeopleController;
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PeopleController.prototype, "retrieveFollowing", null);
exports.PeopleController = PeopleController = __decorate([
    (0, common_1.Controller)("people"),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], PeopleController);
//# sourceMappingURL=people.controller.js.map