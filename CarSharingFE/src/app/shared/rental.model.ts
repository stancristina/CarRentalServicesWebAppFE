export class Rental {
    id: number;
    startDate: string;
    period: number;
    carId: number;
    carModel: string;
    clientId: number;
    clientFirstName: string;
    clientLastName: string;
 
   constructor(input?: any) {
     Object.assign(this, input);
   }
 }
 