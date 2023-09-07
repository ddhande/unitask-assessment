import {  MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import UserController from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JokesService } from './jokes/jokes.service';
import { JokesController } from './jokes/jokes.controller';
import { DatabaseModule } from 'sequelize.module';
import { JwtMiddleware } from './auth/jwt.middleware';

@Module({
  imports: [UserModule, AuthModule, DatabaseModule],
  controllers: [AppController, UserController, JokesController],
  providers: [AppService, JokesService],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(JwtAuthGuard)
//       .forRoutes('user/me'); // Add your protected routes here
//   }
// }

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('user/me'); // Apply the middleware to all routes
  }
}
