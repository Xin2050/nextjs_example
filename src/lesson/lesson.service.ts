import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { AssignStudentsToLessonInput, CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate } = createLessonInput;
    const lesson = this.lessonRepository.create({
      name,
      startDate,
      endDate,
      students: [],
    });

    return this.lessonRepository.save(lesson);
  }

  async getLesson(id: number): Promise<Lesson> {
    return this.lessonRepository.findOne(id);
  }

  async getAllLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async assignStudentsToLesson(
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ): Promise<Lesson> {
    const { lessonId, students } = assignStudentsToLessonInput;
    const lesson = await this.lessonRepository.findOne(lessonId);
    if (lesson.students) {
      lesson.students = [...lesson.students, ...students];
    } else {
      lesson.students = students;
    }

    return lesson.save();
  }
}
