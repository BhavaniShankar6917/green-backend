import { SupabaseService } from "./supabase.service";
import { SignupDto } from './dtos/signup-dto';
export declare class SupabaseController {
    private supabaseService;
    constructor(supabaseService: SupabaseService);
    sayHelloWorld(body: SignupDto): Promise<{
        user: import("@supabase/gotrue-js").User;
        session: import("@supabase/gotrue-js").Session;
    } | import("@supabase/gotrue-js").AuthError>;
}
