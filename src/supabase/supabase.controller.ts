import { Controller, Get, Request, Response,Post, Body } from '@nestjs/common';
import { SupabaseService} from "./supabase.service"
import { SignupDto } from './dtos/signup-dto';

@Controller('supabase')
export class SupabaseController {
    constructor(private supabaseService: SupabaseService){}
    @Post()
    async sayHelloWorld(@Body() body: SignupDto){
        // console.log(body.email, body.password, body.phone);
        let {data, error} = await this.supabaseService.supabase.auth.signUp({email: body.email, password: body.password, phone: body.phone});
        if(data){
            console.log(data);
            return data;
        }
        if(error){
            return error;
        }
    }


}
