import {
  Controller,
  Get,
  Req,
  Post,
  Res,
  Body,
  HttpStatus,
  Header,
  Param,
} from "@nestjs/common";
import { Response, Request } from "express";
import { SupabaseService } from "../supabase.service";

@Controller("people")
export class PeopleController {
  constructor(private supabaseService: SupabaseService) {}
  async retrieveFollowing(@Req() req: Request, @Res() res: Response) {
    this.supabaseService.supabase.from("people").select("");
  }
}
