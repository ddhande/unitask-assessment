import { Injectable } from '@nestjs/common';
import { User } from '../../models/user.model'; // Import your user entity or type here
import { UserService } from '../user/user.service'; // Import your user service here
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService, // Inject your user service
        private jwtService: JwtService, // Inject JWT service
      ) {}

      async validateUser(username: string): Promise<User | null> {
        
        let user = await this.userService.findUserByUsername(username);
    
        if (user ) {
          // Password matches, return the user
          return user;
        }
        return null;
      }

      async validateUsernamePassword(username: string, password: string): Promise<User | null> {
        
        let user = await this.userService.findUserByUsername(username);
    
        if (user && user.password === password) {
          // Password matches, return the user
          return user;
        }
        return null;
      }

      async createToken(userId: number,username:string, secret: string) {
        const payload = { sub: userId ,username};
        return {
          access_token: this.jwtService.sign(payload,{secret}),
        };
      }
}
