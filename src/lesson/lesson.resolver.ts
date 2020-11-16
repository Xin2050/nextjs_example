import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LessonTypes } from './lesson.types';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { UseGuards } from '@nestjs/common';

import { GraphQLAuthGuard } from '../auth/auth.guard';
import { GetGQLUserID} from '../auth/get-user.decorator';

@Resolver(of => LessonTypes)
@UseGuards(GraphQLAuthGuard)
export class LessonResolver {
  constructor(private lessonService: LessonService) {
  }


  @Query((returns) => LessonTypes)

  lesson(@Args('id') id: number) {
    return this.lessonService.getLesson(id);
  }

  @Query(returns => [LessonTypes])
  getAllLessons() {
    return this.lessonService.getAllLessons();
  }

  @Mutation((returns) => LessonTypes)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
    @GetGQLUserID() userid: string,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }
}
