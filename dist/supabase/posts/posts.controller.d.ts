import { SupabaseService } from "../supabase.service";
import { SharpService } from "../sharp/sharp.service";
import { Response, Request } from "express";
import { NewPostDto } from "../dtos/newpost-dto";
export declare class PostsController {
    private supabaseService;
    private sharpService;
    constructor(supabaseService: SupabaseService, sharpService: SharpService);
    publicUrl: string;
    addNewPost(body: NewPostDto, req: Request, res: Response): Promise<import("@supabase/supabase-js").AuthError>;
    getFeed(req: Request, res: Response): Promise<void>;
    getPostsOfOneUser(req: Request, res: Response, params: any): Promise<{
        id: any;
        caption: any;
        photo_url: any;
        created_at: any;
        likes: any;
    }[] | import("@supabase/supabase-js").PostgrestError>;
}
