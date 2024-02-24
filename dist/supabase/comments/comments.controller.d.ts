import { Response, Request } from "express";
import { SupabaseService } from "../supabase.service";
import { NewCommentDto } from "../dtos/newcomment-dto";
export declare class CommentsController {
    private supabaseService;
    constructor(supabaseService: SupabaseService);
    addComment(req: Request, res: Response, body: NewCommentDto): Promise<void>;
    retrievePostComments(req: Request, res: Response, params: any): Promise<void>;
    getRepliesForComments(req: Request, res: Response): Promise<void>;
}
