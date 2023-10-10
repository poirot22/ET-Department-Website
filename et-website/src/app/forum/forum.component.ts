import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { set } from 'mongoose';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent {
  constructor(private http: HttpClient, private router: Router) {}

  loginForm = new FormGroup({
    id: new FormControl(),
    password: new FormControl(),
  });

  message: any = '';
  posts: any;
  temp: any;
  userData: any;
  totalRecords: any;
  page: number = 1;
  ngOnInit() {
    this.http.get('http://localhost:9000/getAllPosts').subscribe((resp) => {
      //console.log(resp)
      this.temp = resp;
      this.posts = this.temp.posts;
      this.totalRecords = this.posts.length;
      console.log(this.posts);
    });
  }
  //function to check token is present or no
  checkToken() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  login() {
    if (
      this.loginForm.value.id == null ||
      this.loginForm.value.password == null
    ) {
      document.getElementById('loginValidate').style.border =
        '2px solid rgb(127 29 29)';
      document.getElementById('login').style.backgroundColor = 'rgb(127 29 29)';
      setTimeout(() => {
        document.getElementById('loginValidate').style.border = 'none';
        document.getElementById('login').style.backgroundColor =
          'rgb(12 74 110)';
      }, 2000);
      return;
    }
    console.log(this.loginForm.value);
    this.http
      .post('http://localhost:9000/login', this.loginForm.value)
      .subscribe((resp) => {
        this.temp = resp;
        console.log(this.temp);
        if (this.temp.status == 200) {
          localStorage.setItem('userToken', this.temp.token);
          this.router.navigate(['/userforum']);
        }
      });
  }

  logout() {
    localStorage.removeItem('studentToken');
  }
}
