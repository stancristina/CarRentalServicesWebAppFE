export class City {
    id: number;
    name: string;
    country: string;
 
   constructor(input?: any) {
     Object.assign(this, input);
   }
 }
 