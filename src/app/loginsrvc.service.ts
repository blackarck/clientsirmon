import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginsrvcService {

  constructor() {
    
   }

   handlelogout(){
    console.log("called from login services ");
   }
}
