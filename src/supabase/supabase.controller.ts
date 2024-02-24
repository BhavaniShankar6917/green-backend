import {
  Controller,
  Get,
  Req,
  Post,
  Res,
  Body,
  HttpStatus,
  Header,
} from "@nestjs/common";
import { Response, Request } from "express";
import { SignupDto } from "./dtos/signup-dto";
import { SupabaseService } from "./supabase.service";

@Controller("supabase")
export class SupabaseController {
  constructor(private supabaseService: SupabaseService) {}
  @Post("/signin")
  @Header("Access-Control-Allow-Credentials", "true")
  @Header("Access-Control-Allow-Origin", "http://localhost:4200")
  @Header("content-type", "application/json")
  async signInWithPhoneOrEmailAndPassword(
    @Body() body: SignupDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    let { data, error } = await this.supabaseService
      .createServerClient({ req, res })
      .auth.signInWithPassword({
        email: body.email,
        password: body.password,
        phone: body.phone,
      });
    if (data) {
      res.status(HttpStatus.CREATED).send(data);
      return res;
    }
    if (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error);

      return error;
    }
  }

  @Get("session")
  async getSession(@Req() req: Request, @Res() res: Response) {
    let { data, error } = await this.supabaseService
      .createServerClient({ req, res })
      .auth.getSession();
    if (data) {
      res.status(HttpStatus.ACCEPTED).send(data);
      return data;
    }
    if (error) {
      res.status(HttpStatus.NO_CONTENT).send(error);
    }
  }

  @Post("signup")
  async signupWithEmail(
    @Body() body: SignupDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    let { data, error } = await this.supabaseService
      .createServerClient({ req, res })
      .auth.signUp({
        email: body.email,
        password: body.password,
        phone: body.phone,
      });
    if (data) {
      res.status(HttpStatus.CREATED).send(data);
      return res;
    }
    if (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error);
      return error;
    }
  }
}
