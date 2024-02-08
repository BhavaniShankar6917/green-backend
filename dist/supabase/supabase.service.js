"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseService = void 0;
const ssr_1 = require("@supabase/ssr");
const common_1 = require("@nestjs/common");
require("dotenv/config");
let SupabaseService = class SupabaseService {
    constructor() {
        this.supabase = (0, ssr_1.createBrowserClient)(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    }
    createServerClient(context) {
        return (0, ssr_1.createServerClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
            cookies: {
                get: (key) => {
                    if (!context.req.cookies) {
                        return "";
                    }
                    const cookies = context.req.cookies;
                    const cookie = cookies[key] ?? "";
                    return decodeURIComponent(cookie);
                },
                set: (key, value, options) => {
                    if (!context.res)
                        return;
                    console.log("Cookies are set here", key, value, options);
                    context.res.cookie(key, encodeURIComponent(value), {
                        ...options,
                        sameSite: "Lax",
                        httpOnly: true,
                    });
                },
                remove: (key, options) => {
                    if (!context.res)
                        return;
                    context.res.cookie(key, "", { ...options, httpOnly: true });
                },
            },
            auth: {
                persistSession: true,
            },
        });
    }
};
exports.SupabaseService = SupabaseService;
exports.SupabaseService = SupabaseService = __decorate([
    (0, common_1.Injectable)()
], SupabaseService);
//# sourceMappingURL=supabase.service.js.map