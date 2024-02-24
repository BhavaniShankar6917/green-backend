import { IsOptional, IsNotEmpty } from "class-validator";

export class NewCommentDto {
  @IsNotEmpty() comment: string;
  @IsNotEmpty() user_id: string;
  @IsOptional() comment_id: number;
  @IsOptional() post_id: number;
}
