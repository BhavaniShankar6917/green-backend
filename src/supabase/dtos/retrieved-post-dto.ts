import { IsNotEmpty, IsOptional } from "class-validator";

export class RetrievedPostDto {
  @IsNotEmpty() id: string;
  @IsNotEmpty() caption: string;
  @IsOptional() photo_url: string;
  @IsNotEmpty() created_at: string;
  @IsNotEmpty() likes: string;
}
