import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  constructor(private route:ActivatedRoute,private http:HttpClient){}
  postId:any=""
  post:any=""
  temp:any=""
  ngOnInit(){
    this.postId = this.route.snapshot.paramMap.get('id');
    this.http.get("http://localhost:9000/getPostById/"+this.postId).subscribe(resp=>{
        this.temp=resp
        this.post=this.temp.post
    })
  }
}
