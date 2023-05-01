import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'et-website';

  getToken(){
    if(localStorage.getItem("studentToken")){
      return true
    }
    return false
  }
}
