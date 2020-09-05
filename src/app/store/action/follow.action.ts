export class GetFollows {
  static readonly type = '[Follow] Get';
  constructor() {}
}
export class DeleteFollow {
  static readonly type = '[Follow Delete]';
  constructor(public key: string) {}
}

export class AddFollow {
    static readonly type = '[Follow Add]';
    constructor(public key: string) {}
  }
