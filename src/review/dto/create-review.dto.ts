import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  _id: string; // Добавляем поле _id

  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @Max(5)
  @Min(1, { message: 'Рейтинг не может быть меньше 1' })
  @IsNumber()
  rating: number;

  @IsString()
  productId: string;
}
