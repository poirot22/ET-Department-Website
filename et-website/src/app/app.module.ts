import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { FacultyComponent } from './faculty/faculty.component';
import { InfrastructureComponent } from './infrastructure/infrastructure.component';
import { CsitComponent } from './csit/csit.component';
import { AimlComponent } from './aiml/aiml.component';
import { CybersecComponent } from './cybersec/cybersec.component';
import { DatasciComponent } from './datasci/datasci.component';
import { HttpClientModule } from '@angular/common/http';
import { ForumComponent } from './forum/forum.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserForumComponent } from './user-forum/user-forum.component';
import { CommentComponent } from './comment/comment.component';
import { RouterModule } from '@angular/router';
import { DevteamComponent } from './devteam/devteam.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FacultyComponent,
    InfrastructureComponent,
    CsitComponent,
    AimlComponent,
    CybersecComponent,
    DatasciComponent,
    ForumComponent,
    UserForumComponent,
    CommentComponent,
    DevteamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
