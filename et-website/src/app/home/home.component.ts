import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    constructor(private http:HttpClient,private helper:HelperService){

    }
    newsArray:Array<any>=[]
    eventsArray:Array<any>=[{"title":"et","date":"12/12/12","description":"et event","link":"adsklfa;kdf;"},
    {"title":"et","date":"12/12/12","description":"et event","link":"adsklfa;kdf;"},{"title":"et","date":"12/12/12","description":"et event","link":"adsklfa;kdf;"}
  ,{"title":"et","date":"12/12/12","description":"et event","link":"adsklfa;kdf;"},{"title":"et","date":"12/12/12","description":"et event","link":"adsklfa;kdf;"}]
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
