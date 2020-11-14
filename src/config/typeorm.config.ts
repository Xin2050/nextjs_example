import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'dev',
  username: 'dev',
  password: 'dev',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
}