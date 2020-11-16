import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentInput } from './student.input';


@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {
  }

  async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
    const { firstname, lastname ,age} = createStudentInput;
    const student = new Student();
    student.firstname = firstname;
    student.lastname = lastname;
    student.age = age;
    return await student.save();
  }

  async getAllStudents(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async getStudent(id: number): Promise<Student> {
    return await this.studentRepository.findOne(id);
  }

}
