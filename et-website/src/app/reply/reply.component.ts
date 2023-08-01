import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { UserForumComponent } from '../user-forum/user-forum.component';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent {
  replyId:any
  constructor(private router:Router, private route:ActivatedRoute){}
  userData:any
  async ngOnInit(){
    this.replyId=this.route.snapshot.paramMap.get('id');
  
  }
}
