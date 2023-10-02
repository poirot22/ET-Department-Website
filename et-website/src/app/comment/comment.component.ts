import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { UserForumComponent } from '../user-forum/user-forum.component';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  constructor(private route:ActivatedRoute,private http:HttpClient,){}

  commentForm=new FormGroup({
    comment: new FormControl(),
  })

  postId:any=""
  post:any=""
  temp:any=""
  temp2:any=""
  comments:any=[]
  token=localStorage.getItem('studentToken')
  ngOnInit(){
    this.postId = this.route.snapshot.paramMap.get('id');
    console.log(this.token)
    this.http.get("http://localhost:9000/getPostById/"+this.postId).subscribe(resp=>{
        this.temp=resp
        this.post=this.temp.post
        
        this.http.get("http://localhost:9000/getCommentsOnPost/"+this.postId).subscribe(resp=>{
          this.temp2=resp
          console.log(this.temp2)
          this.comments=this.temp2.comments
          console.log(this.comments)
        })
    })
  }
  postedComment:any=""
  commentBody:any=""
  addComment(){
    this.postedComment=this.commentForm.value
    console.log(this.postedComment.comment)
    if(this.postedComment.comment==null){
      alert("Please enter a comment")
      return
    }
    this.commentBody={
      "comment":this.postedComment,
      "postedBy":localStorage.getItem("rollno")
    }
    console.log(this.commentBody)
    const resp=this.http.put("http://localhost:9000/addComment/"+this.postId,this.commentBody) 
    resp.subscribe((data)=>console.log(data))
    console.log(this.commentBody)
    window.location.reload()
  }
}
