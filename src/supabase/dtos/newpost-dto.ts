import { IsString } from "class-validator";

export class NewPostDto {
  image: string;
  @IsString() caption: string;
}
