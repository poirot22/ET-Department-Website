import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InfrastructureComponent } from './infrastructure/infrastructure.component';
import { FacultyComponent } from './faculty/faculty.component';
import { CsitComponent } from './csit/csit.component';
import { AimlComponent } from './aiml/aiml.component';
import { CybersecComponent } from './cybersec/cybersec.component';
import { DatasciComponent } from './datasci/datasci.component';

const routes: Routes = [
  {
    component:HomeComponent,
    path:'home'
  },
  {
    component:InfrastructureComponent,
    path:'infrastruture'
  },
  {
    component:FacultyComponent,
    path:'faculty'
  },
  {
    component:CsitComponent,
    path:'csit'
  },
  {
    component:AimlComponent,
    path:'aiml'
  },
  {
    component:CybersecComponent,
    path:'cybersecurity'
  },
  {
    component:DatasciComponent,
    path:'datascience'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
