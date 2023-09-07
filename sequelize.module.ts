// sequelize.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import sequelize from './sequelize.config';
import User from './models/user.model';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'mysql', // Replace with your database dialect if different
    host: 'localhost', // Replace with your database host
    port: 3306, // Replace with your database port
    username: 'root',
    password: '123456',
    database: 'unitask',
    autoLoadModels: true, // Automatically load models from the defined path
    synchronize: true, // Automatically create tables (in development, be cautious in production)
    models: [User], // Define your Sequelize models here
  })],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
