import { Response, Request } from "express";
import { SupabaseService } from "../supabase.service";
export declare class PeopleController {
    private supabaseService;
    constructor(supabaseService: SupabaseService);
    retrieveFollowing(req: Request, res: Response): Promise<void>;
}
