import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  loggedIn(){
    if(localStorage.getItem('studentToken')!=undefined){
      return true;
    }
    return false;
  }
}
