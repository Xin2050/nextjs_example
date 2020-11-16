import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentResolver } from './student.resolver';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Student])
  ],
  providers: [StudentService, StudentResolver],
})
export class StudentModule {}
