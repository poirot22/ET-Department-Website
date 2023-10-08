import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    id: new FormControl(),
    password: new FormControl()
  })

  message:any=""
  posts:any
  temp:any
  userData:any
  totalRecords:any
  page:number=1
  ngOnInit(){
    this.http.get("http://localhost:9000/getAllPosts").subscribe(resp=>{
      //console.log(resp)
      this.temp=resp
      this.posts=this.temp.posts
      this.totalRecords=this.posts.length
      console.log(this.posts)
    })
}
  //function to check token is present or no
  checkToken(){
    if(localStorage.getItem("token")){
      return true
    } else{ return false}
  }

  login(){
    this.http.post("http://localhost:9000/login",this.loginForm.value).subscribe(resp=>{
      this.temp=resp
      console.log(this.temp)
      if(this.temp.status==200){
        localStorage.setItem("userToken",this.temp.token)
        this.router.navigate(['/userforum'])
      }
    })
  }

  /*getToken(){
    if(localStorage.getItem("studentToken")){
      return true
    }
    return false
  }*/

  logout(){
    localStorage.removeItem("studentToken")
  }



}

}