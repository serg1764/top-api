import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class ReviewModel {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt?: Date;
}
export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
