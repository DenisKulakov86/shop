export class Product {
  name: string;
  price: number;
  number: number;
  size: { [key: string]: boolean };
  color: { [key: string]: boolean };
  category: string;
  img?: string;
  desc?: string;
  id?: number | string;
}
