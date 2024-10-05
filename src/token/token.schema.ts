// src/token/schemas/token.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Token extends Document {
  @Prop({ required: true })
  userId: string; // Reference to the user's ID

  @Prop({ required: true })
  token: string;

  @Prop({ required: true, expires: '8h' }) 
  createdAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
