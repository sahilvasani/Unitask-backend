import { Controller, Get, UseGuards } from '@nestjs/common';
import { RandomJokeService } from './random-joke.service';
import { JwtGuard } from 'src/users/jwt.guard';
import { errorResponse, sucessResponse } from 'src/common/response';

@Controller('random-joke')
export class RandomJokeController {
  constructor(private readonly randomJokeService: RandomJokeService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getRandomJoke(): Promise<any> {
    try {
      const joke = await this.randomJokeService.getRandomJoke();
      return sucessResponse('User created successfully', joke);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
