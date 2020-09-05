import { Product } from 'src/app/model/product.model';

export class LoadProducts {
  static readonly type = '[Product] Load';
  constructor(public products: Product[]) {}
}

export class GetProducts {
  static readonly type = '[Product] Get';
  constructor(
    public options: {
      orderBy?: keyof Product;
      orderValue?: Product[keyof Product];
      limit?: number;
    } = {}
  ) {}
}

export class AddProduct {
  static readonly type = '[Product] Add';
  constructor(public data: Product) {}
}

export class UpdateProduct {
  static readonly type = '[Product] Update';
  constructor(public key, public data: Product) {}
}

export class DeleteProduct {
  static readonly type = '[Product] Delete';
  constructor(public key?) {}
}
