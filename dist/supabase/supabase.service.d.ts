import "dotenv/config";
export declare class SupabaseService {
    createServerClient(context: any): import("@supabase/supabase-js").SupabaseClient<any, "public", any>;
    supabase: import("@supabase/supabase-js").SupabaseClient<any, "public", any>;
    uploadImageToStorage(bucket: string, fileName: string, fileFormat: string, dataAsArrayBuffer: ArrayBuffer): Promise<{
        data: {
            path: string;
        };
        error: import("@supabase/storage-js").StorageError;
    }>;
    getPublicUrl(path: string): Promise<string>;
    addPost(caption: string, photo_url: string, user_id: string): Promise<void>;
}
