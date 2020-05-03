export class City {
    Id: number;
    Name: string;
    Country: string;
 
   constructor(input?: any) {
     Object.assign(this, input);
   }
 }
 