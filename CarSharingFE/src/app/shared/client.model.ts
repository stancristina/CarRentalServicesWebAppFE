export class Client {
    id: number;
    CNP: string;
    firstName: string;
    lastName: string;
    address: string;
 
   constructor(input?: any) {
     Object.assign(this, input);
   }
 }
 