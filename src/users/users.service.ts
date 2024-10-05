import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token/token.service';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async create(body: CreateUserDto) {
    if (!body.email) {
      throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
    } else if (!body.password) {
      throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
    }

    const validateEmail = await this.findByEmail(body.email);
    if (validateEmail) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);

    const user = await this.userModel.create(body);

    // generate token and save it to the database

    const token = this.jwtService.sign({ userId: user._id });

    const saveTokenInDb = await this.tokenService.createToken(
      user._id.toString(),
      token,
    );

    return { user: user.email, token: saveTokenInDb._id };
  }

  async login(body: CreateUserDto) {
    const user = await this.userModel.findOne({ email: body.email });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const token = this.jwtService.sign({ userId: user._id });
    const saveTokenTodb = await this.tokenService.createToken(
      user._id.toString(),
      token,
    );

    return { user: user.email, token: saveTokenTodb._id };
  }

  async validateToken(tokenId: string) {
    try {
      const token = await this.tokenService.findTokenById(tokenId);
      if (!token) {
        throw new HttpException('Token not found', HttpStatus.NOT_FOUND);
      }
      return token;
    } catch (error) {
      throw new HttpException('Error validating token', HttpStatus.BAD_REQUEST);
    }
  }

  async logout(tokenId: string) {
    try {
      await this.tokenService.deleteToken(tokenId);
      return { message: 'Token removed successfully' };
    } catch (error) {
      throw new HttpException('Error logging out', HttpStatus.BAD_REQUEST);
    }
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({
      email,
    });

    return !!user;
  }
}
