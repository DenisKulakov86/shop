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

export class UpdateItems<T> {
  static readonly type = 'Update Item';
  constructor(public key: string, public data: T) {}
}
