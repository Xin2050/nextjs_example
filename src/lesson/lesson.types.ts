import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Lesson')
export class LessonTypes {
  @Field(type => ID)
  id: number;
  @Field()
  name: string;
  @Field()
  startDate: string;
  @Field()
  endDate: string;
}
