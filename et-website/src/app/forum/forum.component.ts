import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {

  constructor(private http:HttpClient,private router:Router){

  }


  loginForm = new FormGroup({
    rollno: new FormControl(),
    password: new FormControl()
  })
  message:any=""
  posts:any
  temp:any
  ngOnInit(){
    this.http.get("http://localhost:9000/getAllPosts").subscribe(resp=>{
      //console.log(resp)
      this.temp=resp
      this.posts=this.temp.posts
      console.log(this.posts)
    })
  }

  loginStudent(){
    this.http.post("http://localhost:9000/login",this.loginForm.value).subscribe(resp=>{
      this.temp=resp
      console.log(this.temp)
      if(this.temp.status==200){
        localStorage.setItem("studentToken",this.temp.token)
        //this.router.navigate(['/forum'])
      }
    })
  }

  getToken(){
    if(localStorage.getItem("studentToken")){
      return true
    }
    return false
  }

}


  


