import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { response } from 'express';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';

const productID = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
  _id: new Types.ObjectId().toHexString(),
  name: 'Test',
  title: 'Загаловок',
  description: 'Описание',
  productId: productID,
  rating: 5,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let myProductId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST) - success', async () => {
    const response = await request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201);

    createdId = response.body._id;
    expect(createdId).toBeDefined();
  });

  /*it('/review/create (POST) - fail', async () => {
    const response = await request(app.getHttpServer())
      .post('/review/create')
      .send({ ...testDto, rating: 0 })
      .expect(400);
  });*/

  it('/review/create (POST) - fail', () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({ ...testDto, rating: 0 })
      .expect(400, {
        error: 'Bad Request',
        statusCode: 400,
        message: ['Рейтинг не может быть меньше 1'],
      });
  });

  it('/review/byProduct/:productId (GET) - success', async () => {
    const response = await request(app.getHttpServer())
      .get('/review/byProduct/' + productID)
      .expect(200);

    /*myProductId = response.body.productId;
    console.log(productID);
    console.log('бла бла бла');
    console.log(response);
    console.log(response.body);
    console.log(myProductId);
    expect(response.body.length).toBe(1);*/

    /*console.log(JSON.parse(response.text));
    const responseBody = JSON.parse(response.text);
    expect(responseBody.length).toBe(1);*/

    expect(response.body.length).toBe(1);
  });

  it('/review/byProduct/:productId (GET) - fail', async () => {
    const response = await request(app.getHttpServer())
      .get('/review/byProduct/' + '123')
      .expect(200);

    /*myProductId = response.body.productId;
    console.log(productID);
    console.log('бла бла бла');
    console.log(response);
    console.log(response.body);
    console.log(myProductId);
    expect(response.body.length).toBe(1);*/

    /*console.log(JSON.parse(response.text));
    const responseBody = JSON.parse(response.text);
    expect(responseBody.length).toBe(1);*/

    expect(response.body.length).toBe(0);
  });

  it('/review/:id (DELETE) - success', () => {
    return request(app.getHttpServer())
      .delete('/review/' + createdId)
      .expect(200);
  });

  it('/review/:id (DELETE) - fail', () => {
    return request(app.getHttpServer())
      .delete('/review/' + '123')
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND,
      });
  });

  afterAll(() => {
    disconnect();
  });
});
