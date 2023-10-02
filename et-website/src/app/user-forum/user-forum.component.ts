import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// import { DatashareService } from '../datashare.service';

@Component({
  selector: 'app-user-forum',
  templateUrl: './user-forum.component.html',
  styleUrls: ['./user-forum.component.css']
})
export class UserForumComponent implements OnInit {
  userData: any;
  temp: any;
  posts: any;
  data: any;
  totalRecords: any;
  page: number = 1;

  constructor(
    private http: HttpClient,
    private router: Router
    // private datashare: DatashareService
  ) {}

  async ngOnInit() {
    await this.getData();
  }

  async getData() {
    try {
      const headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('studentToken'),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      });

      const httpOptions = {
        headers: headers_object
      };

      const resp = await this.http.get("http://localhost:9000/verify", httpOptions).toPromise();
      this.temp = resp;
      this.posts = [];
      const userDataResp = await this.http.get("http://localhost:9000/getStudentByRollNo/" + this.temp["Student Roll Number"]).toPromise();
      this.temp = userDataResp;
      this.userData = this.temp["Student Data"];
      // this.datashare.data = this.userData;
      //set rollno in local storage
      localStorage.setItem('rollno', this.userData.rollno);
      const postsResp = await this.http.get("http://localhost:9000/getAllPosts").toPromise();
      this.temp = postsResp;
      this.posts = this.temp.posts;
      this.data = this.posts;
      this.totalRecords = this.data.length;
    } catch (error) {
      console.error(error);
    }
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  postForm = new FormGroup({
    title: new FormControl(),
    content: new FormControl()
  });

  logout() {
    localStorage.removeItem("studentToken");
    this.router.navigate(["/forum"]);
  }

  postData: any;

  post() {
    this.postData = this.postForm.value;
    if (this.postData.content != null && this.postData.title != "") {
      this.postData.postedBy = this.userData.rollno;
      this.http.post("http://localhost:9000/addPost", this.postData).subscribe((resp: any) => {
        console.log(resp);
        this.router.navigateByUrl('home', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/userforum']);
        });
      });
    } else {
      alert("Please enter some content")
    }
  }

  deletePost() {
    // Add your delete post logic here
  }
}
