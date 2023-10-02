import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  rollNo: any = '';
  user: any = '';
  posts: any = '';
  userPosts: any = [];
  constructor(private router: ActivatedRoute, private http: HttpClient) {}

  async ngOnInit() {
    this.rollNo = this.router.snapshot.paramMap.get('rollno');
    const userDataResp = await this.http
      .get('http://localhost:9000/getStudentByRollNo/' + this.rollNo)
      .toPromise();
    this.user = userDataResp['Student Data'];
    console.log(this.user);
    this.posts = this.user.posts;
    console.log(this.posts);
    for (let i = 0; i < this.posts.length; i++) {
      console.log(this.posts[i]);
      const postResp = await this.http
        .get('http://localhost:9000/getPostById/' + this.posts[i])
        .toPromise();
      console.log(postResp);
    }
  }

  // deletePost(postId) {
  //   this.http
  //     .delete('http://localhost:9000/deletePost/' + postId)
  //     .toPromise()
  //     .then((res) => {
  //       console.log(res);
  //       window.location.reload();
  //     });
  // }
}
