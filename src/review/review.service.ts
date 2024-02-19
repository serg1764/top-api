import { Injectable } from '@nestjs/common';
import { Model, Document, Types } from 'mongoose';
import { ReviewModel } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel.name)
    private readonly reviewModel: Model<ReviewModel>,
  ) {}

  async create(dto: CreateReviewDto): Promise<Document> {
    return this.reviewModel.create(dto);
  }

  async delete(id: string): Promise<Document> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductID(productId: string): Promise<Document[]> {
    return this.reviewModel
      .find({ productId: new Types.ObjectId(productId) })
      .exec();
  }
}
