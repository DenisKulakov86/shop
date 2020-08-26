export const category = ['Майки', 'Футболки', 'Бриджи', 'Спорт'];
export const newProduct: Product = {
  name: '',
  price: 1000,
  category: 'Футболки',
  size: {
    '42': 10,
    '44': 20,
    '46': 30,
    '48': 40,
    '50': 50,
    '52': 50,
    '54': 50,
    '56': 50,
    '58': 50,
    '60': 50,
  },
  img: '',
};

export class Product {
  name: string;
  price: number;
  size: { [key: number]: number };
  category: string;
  img?: string;
  desc?: string;
  key?: string;
}
