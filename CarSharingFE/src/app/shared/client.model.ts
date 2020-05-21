export class Client {
    id: number;
    cnp: string;
    firstName: string;
    lastName: string;
    address: string;
 
   constructor(input?: any) {
     Object.assign(this, input);
   }
 }
 