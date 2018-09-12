import { CookieService } from './services/cookie.service';
import { MemberService } from './services/member.service';
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import 'hammerjs';

import { MaterialModule } from './material.module';

import { AcademyModule } from './features/academy/academy.module';
import { TeamsModule } from './features/teams/teams.module';
import { PrivateModule } from './features/private/private.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FindUsComponent } from './find-us/find-us.component';
import { MessageUsComponent } from './message-us/message-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { LinksComponent } from './links/links.component';
import { ClubHistoryComponent } from './club-history/club-history.component';
import { LoginComponent } from './login/login.component';
import { MerchandiseComponent } from './merchandise/merchandise.component';

/* Routing Module */
import { AppRoutingModule } from './app-routing/app-routing.module';

/* Services and utilities */
import { DisplayUtilitiesModule } from './display-utilities/display-utilities.module';
import { NewsService } from './services/news.service';
import { UserService } from './services/user.service';
import { LoginService } from './services/login.service';
import { CommonService } from './services/common.service';
import { SessionDataService } from './services/session-data.service';
import { LoggerService } from './services/logger.service';
import { ErrorService } from './services/error.service';

/* Components */
import { NewsComponent } from './news/news.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { PhotosComponent } from './photos/photos.component';
import { VideosComponent } from './videos/videos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FindUsComponent,
    MessageUsComponent,
    ContactUsComponent,
    DownloadsComponent,
    LinksComponent,
    ClubHistoryComponent,
    LoginComponent,
    MerchandiseComponent,
    NewsComponent,
    SponsorsComponent,
    PhotosComponent,
    VideosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    DisplayUtilitiesModule,
    AppRoutingModule,
    MaterialModule,
    PrivateModule,
    AcademyModule,
    TeamsModule
  ],
  providers: [
    LoggerService,
    SessionDataService,
    CommonService,
    ErrorService,
    LoginService,
    UserService,
    NewsService,
    MemberService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
