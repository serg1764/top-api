import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
//import { Document } from 'mongoose';
/** Спросить у Серёги есть ди в mongoose поля data и id и можно
 * ли их приэкстендить например одно в клас другое через
 * интерфейс если они в разном лежат*/

@Schema()
export class AuthModel {
  @Prop()
  _id: string;

  @Prop({ unique: true }) // Устанавливаем уникальность для email
  email: string;

  @Prop()
  passwordHash: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
