import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewModel, ReviewSchema } from './review.model';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  imports: [
    MongooseModule.forFeature([
      {
        name: ReviewModel.name,
        schema: ReviewSchema,
      },
    ]),
  ],
  providers: [ReviewService, ReviewModel],
})
export class ReviewModule {}
