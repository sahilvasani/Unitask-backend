import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { RandomJokeModule } from './random-joke/random-joke.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
    MongooseModule.forRoot(process.env.MONGO_URL), // Connect to MongoDB
    UsersModule, RandomJokeModule,
  ],
})
export class AppModule {}
