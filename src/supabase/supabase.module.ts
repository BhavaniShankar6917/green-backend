import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { SupabaseController } from './supabase.controller';
import { PostsController } from './posts/posts.controller';
import { CommentsController } from './comments/comments.controller';
import { LikesController } from './likes/likes.controller';
import { PeopleController } from './people/people.controller';
import { SharpService } from './sharp/sharp.service';

@Module({
  providers: [SupabaseService, SharpService],
  controllers: [SupabaseController, PostsController, CommentsController, LikesController, PeopleController]
})
export class SupabaseModule {}
