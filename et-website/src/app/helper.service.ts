import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private http: HttpClient) { }

  loggedIn(){
    if(localStorage.getItem('studentToken')!=undefined){
      return true;
    }
    return false;
  }
  temp:any=""
  async getUser(){
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('studentToken'),
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    });

    const httpOptions = {
      headers: headers_object
    };
    const resp = await this.http.get("http://localhost:9000/verify", httpOptions).toPromise();
    this.temp = resp;
    console.log(this.temp)
    return this.temp["Student Roll Number"]
  }
}
