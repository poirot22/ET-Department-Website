import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent {
  constructor (private http:HttpClient, private router:Router){

  }
  facultyList:any
  temp:any
  ngOnInit(){
    this.http.get("http://localhost:9000/getFaculty").subscribe(resp=>{
      this.temp=resp
      this.facultyList=this.temp.details
      console.log(resp)
    });
  }

  defaultPic(event){
    event.target.src = "assets/img/default-profile-photo.jpg"
  }
}
