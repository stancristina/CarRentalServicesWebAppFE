export class Shop {
    Id: number;
    Name: string;
    CityId: number;
 
   constructor(input?: any) {
     Object.assign(this, input);
   }
 }
 