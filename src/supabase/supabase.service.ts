import { createServerClient, createBrowserClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { Injectable, OnModuleInit } from '@nestjs/common';
import "dotenv/config";

@Injectable()
export class SupabaseService {
    createServerClient(context){
        return createServerClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY,{cookies: {
          get: (key) => {
            const cookies = context.req.cookies
            const cookie = cookies[key] ?? ''
            return decodeURIComponent(cookie)
          }
        }})
    }
    supabase = createBrowserClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
}
