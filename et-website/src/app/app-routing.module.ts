import { ReplyComponent } from './reply/reply.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InfrastructureComponent } from './infrastructure/infrastructure.component';
import { FacultyComponent } from './faculty/faculty.component';
import { CsitComponent } from './csit/csit.component';
import { AimlComponent } from './aiml/aiml.component';
import { CybersecComponent } from './cybersec/cybersec.component';
import { DatasciComponent } from './datasci/datasci.component';
import { ForumComponent } from './forum/forum.component';
import { UserForumComponent } from './user-forum/user-forum.component';
import { CommentComponent } from './comment/comment.component';
import { DevteamComponent } from './devteam/devteam.component';
import { StudentsclubComponent } from './studentsclub/studentsclub.component';
import { FacultyprofileComponent } from './facultyprofile/facultyprofile.component';


const routes: Routes = [
  {
    component:HomeComponent,
    path:'home'
  },
  {
    component:StudentsclubComponent,
    path:'studentsclub'
  },
  {
    component:FacultyprofileComponent,
    path:'facultyprofile'
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
  },
  {
    component:ForumComponent,
    path:'forum'
  },
  {
    component:UserForumComponent,
    path:'userforum'
  },
  {
    component:CommentComponent,
    path:'comment/:id'
  },
  {
    component:DevteamComponent,
    path:'developers'
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
