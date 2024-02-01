import "dotenv/config";
export declare class SupabaseService {
    createServerClient(context: any): import("@supabase/supabase-js").SupabaseClient<any, "public", any>;
    supabase: import("@supabase/supabase-js").SupabaseClient<any, "public", any>;
}
