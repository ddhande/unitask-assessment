import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../user/dto/login.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
      try {
        const { username, password } = loginDto;
        // Validate username and password
        const user = await this.authService.validateUsernamePassword(username, password);
        
        if (!user) {
          return { message: 'incorrect creds or user not found' };
        }
        
        const { id} = user;
        const jwtSecret = process.env.JWT_SECRET; 
        const token = await this.authService.createToken(id,username,jwtSecret);
        return { id, username, token };
      } catch (error) {
        console.error(error);
        return { message: 'Authentication failed', error: error.message };
      }
    }
}
