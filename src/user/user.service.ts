import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import  User  from '../../models/user.model'; // Import the User model
import { CreateUserDto } from './dto/create-user.dto'; // Import the CreateUserDto


@Injectable()
export class UserService {constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      console.log("createUserDto",createUserDto)
      const { username, email, password } = createUserDto;
      console.log(username, email, password )
       // Ensure that the required fields are not empty
    if (!username || !email || !password) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: 'Missing required fields in createUserDto',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
      const user = await this.userModel.create({ username, email, password });
      return user;
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        // Handle validation errors
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Validation Error',
            message: error.errors.map((err: any) => err.message).join(', '),
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      // Handle other database-related errors here
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Failed to create user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
 async findUserByUsername(username: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({
        where: { username },
      });
      if (!user) {
        // Handle the case where the user with the given username is not found
        throw new NotFoundException('User not found');
      }
  
      return user;
    } catch (error) {
      // Handle any database-related errors here
      throw new Error('Failed to find user');
    }
  }
  async fetchAllUsers(): Promise<User[]> {
    try {
      const users = await this.userModel.findAll(); // Retrieve all users from the database

      return users;
    } catch (error) {
      // Handle any database-related errors here
      throw new Error('Failed to fetch all users');
    }
  }
  // async findOneById(userId: number): Promise<User | null> {
  //   try {
  //     const user = await this.userModel.findOne({
  //       where: { id: userId },
  //     });

  //     return user || null; // Return the user if found, otherwise return null
  //   } catch (error) {
  //     // Handle any database-related errors here
  //     throw error;
  //   }
  // }
}
