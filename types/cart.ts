export interface IOrder {
  email: string;
  orderInfo: OrderInfo[];
  totalPrice: number;
  customerInfo: CustomerInfo;
}

export interface OrderInfo {
  productId: string;
  base: string;
  extras: string[];
  protein: string;
  dietaryPreferences: string;
  orderedQuantity: number;
  price: number;
}

export interface CustomerInfo {
  name: string;
  number: string;
  city: string;
  colony: string;
  postOffice: string;
  subDistrict: string;
}
