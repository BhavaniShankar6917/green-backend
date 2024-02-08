import { Response, Request } from "express";
import { SupabaseService } from "./supabase.service";
import { SignupDto } from "./dtos/signup-dto";
export declare class SupabaseController {
    private supabaseService;
    constructor(supabaseService: SupabaseService);
    signInWithPhoneOrEmailAndPassword(body: SignupDto, req: Request, res: Response): Promise<Response<any, Record<string, any>> | import("@supabase/gotrue-js").AuthError>;
    getSession(req: Request, res: Response): Promise<{
        session: import("@supabase/gotrue-js").Session;
    } | {
        session: null;
    } | {
        session: null;
    }>;
    signupWithEmail(body: SignupDto, req: Request, res: Response): Promise<Response<any, Record<string, any>> | import("@supabase/gotrue-js").AuthError>;
}
