import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'et-website';
  //function for date and time
  date:any
  time:any
  ngOnInit(){
    setInterval(()=>{
      this.date=new Date()
      this.time=this.date.getHours()+":"+this.date.getMinutes()+":"+this.date.getSeconds()
      this.date=this.date.toDateString()
    },1000)
  }

}
