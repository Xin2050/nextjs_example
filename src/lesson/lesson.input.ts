import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, MinLength } from 'class-validator';


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