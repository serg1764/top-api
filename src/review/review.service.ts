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

  async findByProductID(productId: string): Promise<ReviewModel[]> {
    //const myProductID = { productId: new Types.ObjectId(productId) };
    const myProductID1 = { productId: productId };
    //const myProductID2 = { productId: '65d7084ded787563f5953934' };
    const reviews = await this.reviewModel.find(myProductID1).exec();

    /*console.log('myProductID:', myProductID);
    console.log('myProductID1:', myProductID1);
    console.log('findByProductID Query:', reviews);*/

    return reviews;
  }

  async deleteByProductID(productId: string) {
    return this.reviewModel
      .deleteMany({ productId: new Types.ObjectId(productId) })
      .exec();
  }
}
