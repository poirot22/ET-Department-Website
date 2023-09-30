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

    setInterval(this.updateClock, 1000);
        
    // Initial call to set the initial clock position
    this.updateClock();
  }

  updateClock() {
    const hourElem = document.getElementById('hour');
    const minuteElem = document.getElementById('minute');
    const secondElem = document.getElementById('second');
    
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const hourDeg = (360 / 12) * hours + (360 / 12) * (minutes / 60);
    const minuteDeg = (360 / 60) * minutes + (360 / 60) * (seconds / 60);
    const secondDeg = (360 / 60) * seconds;
    
    hourElem.style.transform = `rotate(${hourDeg}deg)`;
    minuteElem.style.transform = `rotate(${minuteDeg}deg)`;
    secondElem.style.transform = `rotate(${secondDeg}deg)`;
}
}
  

