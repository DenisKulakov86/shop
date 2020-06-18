export class Product {
  name: string;
  price: number;
  size: { [key: string]: boolean };
  color: { [key: string]: boolean };
  category:string;
  img?: string;
  desc?: string;
  id?: number;
}
