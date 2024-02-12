import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/test'),
    ConfigModule.forRoot(),
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
  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    const uri = 'mongodb://localhost/test';

    try {
      const client = new MongoClient(uri);
      await client.connect();
      //const collection = client.db().collection('collection');
      console.log('Connected to MongoDB');

      // В этом месте вы можете использовать объект client для выполнения операций с базой данных

      // Пример:
      //const db = client.db('имя_вашей_базы_данных');
      //const collection = db.collection('ваша_коллекция');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
}
