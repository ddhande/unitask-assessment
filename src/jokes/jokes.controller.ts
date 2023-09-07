import { Controller,Get ,UseGuards} from '@nestjs/common';
import axios from 'axios';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import your JwtAuthGuard


@Controller('jokes')
@UseGuards(JwtAuthGuard)
export class JokesController {
    @Get('random-joke')
    async getRandomJoke() {
      try {
        const response = await axios.get('https://api.chucknorris.io/jokes/random');
        return response.data;
      } catch (error) {
        console.error('Error fetching random joke:', error);
        throw new Error('Failed to fetch a random joke');
      }
    }
}
