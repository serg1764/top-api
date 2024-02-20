import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(
          `mongodb://${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}`,
        );
        console.log(configService.get('MONGO_LOGIN'));
        console.log(configService.get('MONGO_PASSWORD'));
        return {
          uri: `mongodb://${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}`,
          user: configService.get('MONGO_LOGIN'),
          pass: configService.get('MONGO_PASSWORD'),
        };
      },
    }),
    AuthModule,
    TopPageModule,
    ProductModule,
    ReviewModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
