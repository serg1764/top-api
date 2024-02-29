import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
//import { Document } from 'mongoose';
/** Спросить у Серёги есть ди в mongoose поля data и id и можно
 * ли их приэкстендить например одно в клас другое через
 * интерфейс если они в разном лежат*/

@Schema()
export class UserModel {
  @Prop({ type: String, unique: true, index: true, required: true }) // Устанавливаем уникальность для email
  email: string;

  @Prop()
  passwordHash: string;

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;

  @Prop({ type: Date, default: null })
  updatedAt?: Date;
}

export const AuthSchema = SchemaFactory.createForClass(UserModel);
