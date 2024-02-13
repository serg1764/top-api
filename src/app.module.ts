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
export class AppModule {
  /*  constructor() {
      this.connectToDatabase();
    }

    private async connectToDatabase() {
      const uri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

      try {
        const client = new MongoClient(uri, {
          auth: {
            username: process.env.MONGO_LOGIN,
            password: process.env.MONGO_PASSWORD,
          },
          authSource: process.env.MONGO_AUTHDATABASE,
        });

        await client.connect();
        console.log('Connected to MongoDB');

        // В этом месте вы можете использовать объект client для выполнения операций с базой данных
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
      }
    }*/
}
