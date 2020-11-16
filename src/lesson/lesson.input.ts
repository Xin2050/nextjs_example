import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDateString, IsUUID, MinLength } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @Field()
  @MinLength(5)
  name: string;

  @Field()
  @IsDateString()
  startDate: string;

  @Field()
  @IsDateString()
  endDate: string;
}

@InputType()
export class AssignStudentsToLessonInput {

  @Field((type) => ID)
  lessonId: number;

  //@IsUUID('4', { each: true })
  @Field((type) => [ID])
  students: number[];
}
