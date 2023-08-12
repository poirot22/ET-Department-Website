import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { UserForumComponent } from '../user-forum/user-forum.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent {
  replyId:any
  constructor(private router:Router, private route:ActivatedRoute,private http:HttpClient){}
  userData:any
  /*async ngOnInit(){
    this.replyId=this.route.snapshot.paramMap.get('id');
  
  }*/
  postId:any=""
  post:any=""
  temp:any=""
  temp2:any=""
  comments:any=[]
  ngOnInit(){
    this.postId = this.route.snapshot.paramMap.get('id');
    this.http.get("http://localhost:9000/getPostById/"+this.postId).subscribe(resp=>{
        this.temp=resp
        this.post=this.temp.post
        
        this.http.get("http://localhost:9000/getCommentsOnPost/"+this.postId).subscribe(resp=>{
          this.temp2=resp
          this.comments=this.temp2.comments
        })
    })
  }
}
