export class Rental {
    id: number;
    startDate: string;
    dStartDate: Date;
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
 