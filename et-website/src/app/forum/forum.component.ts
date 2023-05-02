import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {

  constructor(private http:HttpClient){

  }
  posts:any
  temp:any
  login:any
  reactiveForm=new FormGroup({
    userId:new FormControl(),
    password:new FormControl()
  })
  ngOnInit(){
    this.http.get("http://localhost:9000/getAllPosts").subscribe(resp=>{
      //console.log(resp)
      this.temp=resp
      this.posts=this.temp.posts
      console.log(this.posts)
    })
    if(this.checkToken()){
      this.login=true
      console.log("token present")
    } else{
      this.login=false
      console.log("token not present")
    }
}
  //function to check token is present or no
  checkToken(){
    if(localStorage.getItem("token")){
      return true
    } else{ return false}
  }

  studentLogin(){
  }
    
}