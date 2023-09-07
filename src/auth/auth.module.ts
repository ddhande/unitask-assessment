import { Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../models/user.model'; // Import your Sequelize model
import { JwtMiddleware } from '../auth/jwt.middleware'; // Import your JwtMiddleware here


@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }, // Adjust the expiration time as needed
    }),
  ],
  providers: [AuthService, JwtStrategy,UserService],
  controllers: [AuthController],
  exports: [AuthService,JwtModule],
})
export class AuthModule {
  
}

