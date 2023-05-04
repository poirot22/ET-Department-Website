import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'et-website';
  ngOnInit(){
    setInterval(() => {
      const hour: HTMLElement | null = document.querySelector('#hour');
const minute: HTMLElement | null = document.querySelector('#minute');
const second: HTMLElement | null = document.querySelector('#second');

      const d: Date = new Date(); //object of date()
      const hr: number = d.getHours();
      const min: number = d.getMinutes();
      const sec: number = d.getSeconds();
      const hr_rotation: number = 30 * hr + min / 2; //converting current time
      const min_rotation: number = 6 * min;
      const sec_rotation: number = 6 * sec;
    
      hour.style.transform = `rotate(${hr_rotation}deg)`;
      minute.style.transform = `rotate(${min_rotation}deg)`;
      second.style.transform = `rotate(${sec_rotation}deg)`;
    }, 1000);
    
  }
  getToken(){
    if(localStorage.getItem("studentToken")){
      return true
    }
    return false
  }
}
