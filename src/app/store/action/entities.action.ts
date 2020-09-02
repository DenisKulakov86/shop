export class GetItems<T> {
  static readonly type = 'Get Items';
  constructor(
    public options: {
      orderBy?: keyof T;
      orderValue?: T[keyof T];
      limit?: number;
    } = {}
  ) {}
}

export class AddItem<T> {
  static readonly type = ' Add Item';
  constructor(public data: T) {}
}
