export class Car {
   id: number;
   model: string;
   shopId: number;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
