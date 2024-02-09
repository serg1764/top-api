import { Module } from '@nestjs/common';
//import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import { User, UserSchema } from './models/user.model';
import { Post, PostSchema } from './models/post.model';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  imports: [
    MongoClient.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
})
export class UsersModule {}
