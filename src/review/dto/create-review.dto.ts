export class CreateReviewDto {
  _id: string; // Добавляем поле _id
  name: string;
  title: string;
  description: string;
  rating: string;
  productId: string;
}
