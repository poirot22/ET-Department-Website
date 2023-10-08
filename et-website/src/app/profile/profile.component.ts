import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
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
      const postResp = await this.http
        .get('http://localhost:9000/getPostById/' + this.posts[i])
        .toPromise();
      console.log(postResp);
      this.userPosts.push(postResp['post']);
    }
    console.log(this.userPosts);
  }

  deletePost(postId) {
    console.log(postId);
    this.http
      .delete('http://localhost:9000/deletePost/' + postId)
      .toPromise()
      .then((res) => {
        console.log(res);
        window.location.reload();
      });
  }

  hideandshow() {
    var x = document.getElementById('edit');
    if (x.style.display === 'block' || x.style.display === '') {
        x.style.display = 'none';
    } else {
        x.style.display = 'block';
    }
}



  projectForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    techstack: new FormControl(),
    link: new FormControl(),
  });

  addProject() { 
    console.log(this.projectForm.value);
    this.http.put('http://localhost:9000/addProject/' + this.rollNo, this.projectForm.value).subscribe((resp) => {
      console.log(resp);
      window.location.reload();
    });
  }

  deleteProject(index){
    console.log(index);
    this.http.delete('http://localhost:9000/deleteProject/' + this.rollNo + '/' + index).subscribe((resp) => {
      console.log(resp);
      window.location.reload();
    });
  }

}