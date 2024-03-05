import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { response } from 'express';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';
import { AuthDto } from '../src/auth/dto/auth.dto';

const productID = new Types.ObjectId().toHexString();

const loginDto: AuthDto = {
  login: 'serg17643@gmail.com',
  password: '1',
};

const loginDtoTest1: AuthDto = {
  login: 'serg1764@gmail.com',
  password: '1',
};

const loginDtoTest2: AuthDto = {
  login: 'serg1764@gmail.com',
  password: '2',
};

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
  let token: string;
  let resultMy;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto);
    token = body.access_token;
  });

  it('/auth/login (POST) - success', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDtoTest1)
      .expect(200);

    resultMy = response.body.access_token;
    console.log(resultMy);
    expect(resultMy).toBeDefined();
  });

  it('/auth/login (POST) - success', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDtoTest2)
      .expect(401);

    const { message, error, statusCode } = response.body;
    console.log(message);
    expect(message).toBeDefined();
    expect(error).toBeDefined();
    expect(statusCode).toBeDefined();
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
    console.log(productID);
    console.log(token);
    const response = await request(app.getHttpServer())
      .get('/review/byProduct/' + productID)
      .set('Authorization', 'Bearer ' + token)
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
      .set('Authorization', 'Bearer ' + token)
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
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
  });

  it('/review/:id (DELETE) - fail', () => {
    return request(app.getHttpServer())
      .delete('/review/' + '123')
      .set('Authorization', 'Bearer ' + token)
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND,
      });
  });

  afterAll(() => {
    disconnect();
  });
});
