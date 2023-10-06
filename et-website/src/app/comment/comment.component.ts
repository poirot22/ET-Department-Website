import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { UserForumComponent } from '../user-forum/user-forum.component';
import { HelperService } from '../helper.service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  constructor(private route:ActivatedRoute,private http:HttpClient,public helper:HelperService,private router:Router){}

  commentForm=new FormGroup({
    comment: new FormControl(),
  })

  postId:any=""
  post:any=""
  temp:any=""
  temp2:any=""
  comments:any=[]
  commentIDs:any=[]
  userRoll=localStorage.getItem('rollno')
  async ngOnInit(){
    /*function sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }
    
    await sleep(500).then(() => {
      console.log("slept")
    });*/


    this.postId = this.route.snapshot.paramMap.get('id');
    /*this.http.get("http://localhost:9000/getPostById/"+this.postId).subscribe(resp=>{
        this.temp=resp
        this.post=this.temp.post
      
        this.commentIDs=this.post.comments.slice()
        for(let i=0;i<this.commentIDs.length;i++){
       

          const resp= await this.http.get("http://localhost:9000/getCommentById/"+this.commentIDs[i]).toPromise()
          //const postsResp = await this.http.get("http://localhost:9000/getAllPosts").toPromise();
          this.temp2=resp
          this.comments.push(this.temp2.comment)
        }
    })*/
    const resp = await this.http.get("http://localhost:9000/getPostById/"+this.postId).toPromise();
    this.temp = resp;
    this.post = this.temp.post;
    this.commentIDs = this.post.comments.slice();
    for(let i=0;i<this.commentIDs.length;i++){
      const resp2 = await this.http.get("http://localhost:9000/getCommentById/"+this.commentIDs[i]).toPromise();
      this.temp2 = resp2;
      this.comments.push(this.temp2.comment);
    }
  }
  postedComment:any=""
  commentBody:any=""
  rollno:any=""
  addComment(){

    this.postedComment=this.commentForm.value
    console.log(this.postedComment.comment)
    this.rollno=localStorage.getItem('rollno')
    this.commentBody={
      "comment":this.postedComment.comment,
      "postedBy":this.rollno
    }

    const resp=this.http.post("http://localhost:9000/addComment/"+this.postId,this.commentBody).subscribe(resp=>{
      console.log(resp)
    })  
    window.location.reload()
  }

  deleteComment(commentID){

    this.http.delete("http://localhost:9000/deleteComment/"+commentID).subscribe(resp=>{
      console.log(resp)
    })
    window.location.reload()
  }
}
