import { Body, Controller, Request,Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../user/dto/login.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto,@Request() req) {
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
        req.res.cookie('token',token,{httpOnly:true})
        return { id, username };
      } catch (error) {
        console.error(error);
        return { message: 'Authentication failed', error: error.message };
      }
    }

    @Post('logout')
    async logout(@Request() req) {
      // Clear the token cookie by setting it to an empty value and setting its expiration to a past date
      req.res.cookie('token', '', { expires: new Date(0), httpOnly: true });
  
      // Return a success response
      return { message: 'Logout successful' };
    }
}
