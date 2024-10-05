import { Module } from '@nestjs/common';
import { RandomJokeService } from './random-joke.service';
import { RandomJokeController } from './random-joke.controller';
import { JwtGuard } from 'src/users/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '8h' },
      }),
    }),
    TokenModule,
  ],
  controllers: [RandomJokeController],
  providers: [RandomJokeService, JwtGuard],
})
export class RandomJokeModule {}
