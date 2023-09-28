import { Component } from '@angular/core';
import { HelperService } from './helper.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'et-website';
  time = new Date();
  rxTime = new Date();
  intervalId:any;

  constructor(public helper:HelperService){

  }

  ngOnInit() {
    // Using Basic Interval
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    
  }
}
  

