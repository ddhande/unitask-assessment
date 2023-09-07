import { Controller ,Post, Request, Body,HttpStatus, HttpException,UseGuards, Param, Get} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto'; // Import CreateUserDto
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import your JwtAuthGuard
import { JwtMiddleware } from 'src/auth/jwt.middleware';


@Controller('user')
export default class UserController {
    constructor(
        // private readonly authService: AuthService,
        private readonly userService: UserService,
      ) {}
    
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      console.log('darshan')
      // Call your user service to create a new user
      const user = await this.userService.createUser(createUserDto);
      // Return a success response
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User registered successfully',
        data: user,
      };
    } catch (error) {
      // Handle any errors that occur during registration
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('findUser')
  async findAllUsers() {
    const allUsers = await this.userService.fetchAllUsers();
    return { users: allUsers };
  }

  @Get('findUser/:username')
  async findByUsername(@Param('username') username: string) {
    
    const user = await this.userService.findUserByUsername(username);

    if (!user) {
      return { message: 'User not found' };
    }

    // Handle the user data as needed and respond
    return { user };
  }

  @Get('me')
  @UseGuards(JwtMiddleware) // Protect the route with JwtAuthGuard
  async getProfile(@Request() req) {
    console.log("darshn===>>>")
    const user = req.user
    const profile = await this.userService.findUserByUsername(user.username);

    if (!profile) {
      return { message: 'User not found' };
    }

    // Handle the user data as needed and respond
    return { profile };
  }
}
