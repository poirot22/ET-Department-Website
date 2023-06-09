import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    constructor(private http:HttpClient){

    }
    newsArray:Array<any>=[]
    temp:any
    ngOnInit(){
      this.http.get("https://newsapi.org/v2/top-headlines?country=in&category=science&pageSize=8&apiKey=deeb4ecd2eb54e319c67da4554b8eb7a").subscribe(resp=>{
        this.temp=resp 
        console.log(this.temp.articles)
        for(let ele of this.temp.articles){
          this.newsArray.push(ele)
          console.log(ele.title)
        }
        console.log(this.newsArray)
      })
    }
}
