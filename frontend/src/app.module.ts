import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, 
         Location, 
         LocationStrategy } from '@angular/common';

/* Angular Material modules */
import { MdCheckboxModule } from '@angular/material';
import { MdCardModule } from '@angular/material';

/* Application Components */
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home';
import { FindUsComponent } from './components/findus/findUs.component';
import { MessageUsComponent } from './components/messageUs/messageUs.component';
import { ContactUsComponent } from './components/contactUs/contactUs.component';
import { DownloadsComponent } from './components/downloads/downloads.component';
import { LinksComponent } from './components/links/links.component';
import { ClubHistoryComponent } from './components/clubHistory/clubHistory.component';
import { LoginComponent } from './components/login/login.component';
import { ViewTeamComponent } from './components/viewTeam/viewTeam.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { Slide } from './components/slide/slide.component';
import { Carousel } from './components/carousel/carousel.component';
import { NewsComponent } from './components/news/news.component';
import { MerchandiseComponent } from './components/merchandise/merchandise.component';
import { LeagueRepublicTable } from './components/lrTable/leagueRepublicTable.component';
import { LeagueRepublicResults } from './components/lrResults/leagueRepublicResults.component';
import { FarViewComponent } from './components/farView/farView.component';
import { AdminHomeComponent } from './components/admin/adminHome.component';
import { AdminOverviewComponent } from './components/admin/adminOverview.component';
import { AdminTutorialsComponent } from './components/admin/adminTutorials.component';
import { AdminMembersComponent } from './components/admin/adminMembers.component';
import { AdminUsersComponent } from './components/admin/adminUsers.component';
import { EditMemberComponent } from './components/admin/member/editMember.component';
import { CoachesAreaComponent } from './components/admin/adminCoachesArea.component';
import { PhotosComponent } from './components/photos/photos.component';
import { AdvertComponent } from './components/advert/advert.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SessionDataService } from './services/session-data.service';
import { LoginService } from './services/login.service';
import { NewsService }  from './services/news.service';
import { LoggerService } from './services/logger.service';
import { CommonService } from './services/common.service';
import { ErrorService } from './services/error.service';
import { UserService } from './services/user.service';
import { MemberService } from './services/member.service';
import { BookingService } from './services/booking.service';

/* Feature Modules */
import { AcademyModule } from './components/academy/academy.module';
import { FleadhModule }  from './components/fleadh/fleadh.module';


/* Routing Module */
import { AppRoutingModule }   from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SponsorsComponent,
    NewsComponent,
    Slide,
    Carousel,
    MerchandiseComponent,
    FindUsComponent,
    MessageUsComponent,
    ContactUsComponent,
    DownloadsComponent,
    LinksComponent,
    ClubHistoryComponent,
    LoginComponent,
    ViewTeamComponent,
    FarViewComponent,
    LeagueRepublicTable,
    LeagueRepublicResults,
    AdminHomeComponent,
    AdminOverviewComponent,
    AdminTutorialsComponent,
    AdminMembersComponent,
    AdminUsersComponent,
    EditMemberComponent,
    CoachesAreaComponent,
    PhotosComponent,
    AdvertComponent
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AcademyModule, // Note that feature modules must be imported before the routing module
    FleadhModule,
    AppRoutingModule,
    MdCheckboxModule,
    MdCardModule
  ], // modules needed to run this module
  providers: [
    Title,
    SessionDataService,
    LoggerService,
    CommonService,
    ErrorService,
    LoginService,
    UserService,
    NewsService,
    MemberService,
    Location, {provide: LocationStrategy, useClass: HashLocationStrategy}
  ], // additional providers needed for this module
  entryComponents: [ ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
