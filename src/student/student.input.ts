import { MinLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {

  @Field()
  @MinLength(2)
  firstname: string;

  @Field()
  @MinLength(2)
  lastname: string;

  @Field()
  age: number;
}