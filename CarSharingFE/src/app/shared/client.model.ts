export class Client {
    Id: number;
    CNP: string;
    FirstName: string;
    LastName: string;
    Address: string;
 
   constructor(input?: any) {
     Object.assign(this, input);
   }
 }
 