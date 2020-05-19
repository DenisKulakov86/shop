export class Product {
  name: string;
  price: number;
  sizes: { [key: string]: boolean };
  colors: { [key: string]: boolean };
  img?: string;
  desc?: string;
  id?: number;
}
