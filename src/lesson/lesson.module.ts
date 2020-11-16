import { Module } from '@nestjs/common';
import { LessonResolver } from './lesson.resolver';
import { AuthModule } from '../auth/auth.module';
import { LessonService } from './lesson.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Lesson,
    ]),
  ],
  providers: [LessonResolver, LessonService],
})
export class LessonModule {
}
