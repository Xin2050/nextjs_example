import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './student.types';
import { CreateStudentInput } from './student.input';
import { StudentService } from './student.service';

@Resolver(of => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {
  }

  @Query(returns => StudentType)
  getStudent(
    @Args({name:"id",type: () => Int} ) id: number
  ) {
    return this.studentService.getStudent(id);
  }

  @Query(returns => [StudentType])
  getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Mutation(returns => StudentType)
  createStudent(
    @Args('createStudent') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }
}
