export class Product {
  name: string;
  price: number;
  number: number;
  size: { [key: number]: number };
  category: string;
  img?: string;
  desc?: string;
  id?: number | string;
}
