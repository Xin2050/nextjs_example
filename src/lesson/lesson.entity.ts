import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Lesson extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  startDate: string;
  @Column()
  endDate: string;
  @Column('integer', { array: true, nullable: true })
  students: number[];
}