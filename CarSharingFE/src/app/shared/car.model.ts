export class Car {
   Id: number;
   Model: string;
   ShopId: number;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
