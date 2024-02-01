import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
// import { createServerClient } from '@supabase/ssr';

@Module({
  imports: [SupabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
