export class Shop {
    id: number;
    name: string;
    cityId: number;
 
   constructor(input?: any) {
     Object.assign(this, input);
   }
 }
 