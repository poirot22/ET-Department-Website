import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-forum',
  templateUrl: './user-forum.component.html',
  styleUrls: ['./user-forum.component.css']
})
export class UserForumComponent {

  constructor(private http:HttpClient, private router:Router){

  }

  userData:any
  temp:any
  posts:any
  data:any
  totalRecords:any
  page:number=1

  ngOnInit(){

    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('studentToken'),
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Credentials': 'true',
       'Access-Control-Allow-Headers': 'Content-Type',
       'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    });
    const httpOptions = {
      headers: headers_object
    };

    this.http.get("http://localhost:9000/verify",httpOptions).subscribe(resp=>{
        this.temp=resp 
        console.log(this.temp)
        this.http.get("http://localhost:9000/getStudentByRollNo/"+this.temp["Student Roll Number"]).subscribe(resp=>{
            this.temp=resp
            this.userData=this.temp["Student Data"]
            console.log(this.userData)
            this.http.get("http://localhost:9000/getAllPosts").subscribe(resp=>{
              //console.log(resp)
              this.temp=resp
              this.posts=this.temp.posts
              console.log(this.posts)
              this.data=this.posts
              this.totalRecords=this.data.length
            })
        })
    })


  }

  postForm=new FormGroup({
    title: new FormControl(),
    content:new FormControl()
  })

  logout(){
    localStorage.removeItem("studentToken")
    this.router.navigate(["/forum"])
  }

  postData:any
  post(){
    this.postData=this.postForm.value 
    this.postData.postedBy=this.userData.rollno
    this.http.post("http://localhost:9000/addPost",this.postData).subscribe(resp=>{
      console.log(resp)
      this.router.navigateByUrl('home', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/userforum']);
      })
    })
  }

  deletePost(){
    
  }

}
