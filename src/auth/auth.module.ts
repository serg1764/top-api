import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModel, AuthSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: AuthSchema,
      },
    ]),
  ],
  providers: [AuthService],
})
export class AuthModule {}
