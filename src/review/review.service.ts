import { Inject, Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { ReviewModel } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @Inject(ReviewModel) private readonly reviewModel: Model<ReviewModel>,
  ) {}

  async create(dto: CreateReviewDto): Promise<Document> {
    return this.reviewModel.create(dto);
  }
}
