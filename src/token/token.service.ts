// src/token/token.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from './token.schema';

@Injectable()
export class TokenService {
  constructor(@InjectModel(Token.name) private tokenModel: Model<Token>) {}

  async createToken(userId: string, token: string) {
    const newToken = new this.tokenModel({
      userId,
      token,
      createdAt: new Date(),
    });
    return newToken.save();
  }

  async findTokenById(tokenId: string) {
    return this.tokenModel.findById(tokenId);
  }

  async deleteToken(tokenId: string) {
    await this.tokenModel.findByIdAndDelete(tokenId);
  }
}
