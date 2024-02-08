import { createServerClient, createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { Injectable, OnModuleInit } from "@nestjs/common";
import "dotenv/config";

@Injectable()
export class SupabaseService {
  createServerClient(context) {
    return createServerClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        cookies: {
          get: (key) => {
            // console.log(key, context.req.cookies);
            if (!context.req.cookies) {
              return "";
            }
            const cookies = context.req.cookies;
            const cookie = cookies[key] ?? "";
            return decodeURIComponent(cookie);
          },
          set: (key, value, options) => {
            if (!context.res) return;
            console.log("Cookies are set here", key, value, options);
            context.res.cookie(key, encodeURIComponent(value), {
              ...options,
              sameSite: "Lax",
              httpOnly: true,
            });
          },
          remove: (key, options) => {
            if (!context.res) return;
            context.res.cookie(key, "", { ...options, httpOnly: true });
          },
        },
        auth: {
          persistSession: true,
        },
      }
    );
  }
  supabase = createBrowserClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );
}
