export interface ICustomizableMeal {
  _id: string;
  meal_id: string;
  name: string;
  description: string;
  baseOptions: string[];
  proteinOptions: string[];
  extras: string[];
  dietaryPreferences: string[];
  price: number;
  calories: number;
  imgUrl: string[];
  isDeleted: boolean;
  productId: string;
  orderedQuantity: number;
}
