import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Student')
export class StudentType {
  @Field(type=>ID)
  id: number;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  age: number;
}