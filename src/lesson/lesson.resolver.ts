import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonTypes } from './lesson.types';
import { LessonService } from './lesson.service';
import { AssignStudentsToLessonInput, CreateLessonInput } from './lesson.input';
import { UseGuards } from '@nestjs/common';

import { GraphQLAuthGuard } from '../auth/auth.guard';
import { GetGQLUserID } from '../auth/get-user.decorator';
import { Lesson } from './lesson.entity';
import { StudentService } from '../student/student.service';

@Resolver((of) => LessonTypes)
@UseGuards(GraphQLAuthGuard)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query((returns) => LessonTypes)
  lesson(@Args('id') id: number) {
    return this.lessonService.getLesson(id);
  }

  @Query((returns) => [LessonTypes])
  getAllLessons() {
    return this.lessonService.getAllLessons();
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    console.log(lesson);
    return this.studentService.getManyStudents(lesson.students)
  }

  @Mutation((returns) => LessonTypes)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
    @GetGQLUserID() userid: string,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation((returns) => LessonTypes)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    return this.lessonService.assignStudentsToLesson(
      assignStudentsToLessonInput,
    );
  }
}
