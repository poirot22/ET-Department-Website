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

  constructor(private route:ActivatedRoute,private http:HttpClient,private helper:HelperService,private router:Router){}

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
          this.comments=this.temp2.comments
        })
    })
  }
  postedComment:any=""
  commentBody:any=""
  async addComment(){
    this.postedComment=this.commentForm.value
    console.log(this.postedComment.comment)
    this.commentBody={
      "comment":this.postedComment.comment,
      "postedBy": await this.helper.getUser().then(resp=>{return resp.toString()}),
    }
    console.log(this.commentBody)

    this.http.put("http://localhost:9000/addComment/"+this.postId,this.commentBody).subscribe(resp=>{
      console.log(resp)
      this.router.navigateByUrl('home', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/comment/'+this.postId]);
      });
    })
  }
}
