import { Field, ID, ObjectType } from '@nestjs/graphql';
import { StudentType } from '../student/student.types';

@ObjectType('Lesson')
export class LessonTypes {
  @Field((type) => ID)
  id: number;
  @Field()
  name: string;
  @Field()
  startDate: string;
  @Field()
  endDate: string;
  @Field((type) => [StudentType], { nullable: true })
  students: number[];
}
