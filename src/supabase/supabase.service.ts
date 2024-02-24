import { createServerClient, createBrowserClient } from "@supabase/ssr";
import { createClient, AuthError } from "@supabase/supabase-js";

import { Injectable, OnModuleInit } from "@nestjs/common";
import "dotenv/config";
import { Request, Response } from "express";
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
  async uploadImageToStorage(
    bucket: string,
    fileName: string,
    fileFormat: string,
    dataAsArrayBuffer: ArrayBuffer
  ) {
    let { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(`1rma4z_0/${fileName}`, dataAsArrayBuffer, {
        contentType: `image/${fileFormat}`,
      });
    return { data, error };
  }
  async getPublicUrl(path: string) {
    let { publicUrl } = await this.supabase.storage
      .from("posts")
      .getPublicUrl(path).data;
    return publicUrl;
  }
  async addPost(caption: string, photo_url: string, user_id: string) {
    let result = await this.supabase.from("posts").insert({
      caption,
      user_id,
      photo_url,
    });
    console.log(result);
  }
}
