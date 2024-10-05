import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from './jwt.guard';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { errorResponse, sucessResponse } from 'src/common/response';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    try {
      const data = await this.usersService.create(body);
      return sucessResponse('User created successfully', data);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Post('login')
  async login(@Body() body: LoginUserDto) {
    try {
      const data = await this.usersService.login(body);
      return sucessResponse('User logged in successfully', data);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  async logout(@Request() req) {
    const tokenId = req.headers['x-token']; // Pass token ID in headers
    try {
      const data = await this.usersService.logout(tokenId);
      return sucessResponse('User logged out successfully', null);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async me(@Request() req) {
    try {
      const data = await this.usersService.getProfile(req);
      return sucessResponse('User details', data);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
