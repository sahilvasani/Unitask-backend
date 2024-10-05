import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RandomJokeService {
  async getRandomJoke(): Promise<string> {
    const response = await axios.get(process.env.JOCKS_API_URL);
    return response.data.value; // The joke text
  }
}
