import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CovalentCoreModule } from '@covalent/core';
import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentChartsModule } from '@covalent/charts';
import { CovalentDialogsModule } from '@covalent/core';

import { AppComponent } from './app.component'; ;
import { appRoutes, appRoutingProviders } from './app.routes';
import { HomeComponent } from './home';
import { FindUsComponent } from './findus/findUs.component';
import { MessageUsComponent } from './messageUs/messageUs.component';
import { ContactUsComponent } from './contactUs/contactUs.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { LinksComponent } from './links/links.component';
import { ClubHistoryComponent } from './clubHistory/clubHistory.component';
import { LoginComponent } from './login/login.component';
import { ViewTeamComponent } from './viewTeam/viewTeam.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { Slide } from './slide/slide.component';
import { Carousel } from './carousel/carousel.component';
import { NewsComponent } from './news/news.component';
import { MerchandiseComponent } from './merchandise/merchandise.component';
import { AcademyHomeComponent } from './academy/academyHome.component';
import { AcademyCoachesComponent } from './academy/academyCoaches.component';
import { AcademyMemberPaymentComponent } from './academy/academyMemberPayment.component';
import { AcademyOverviewComponent } from './academy/academyOverview.component';
import { AcademyRegistrationComponent } from './academy/academyRegistration.component';
import { AcademyScheduleComponent } from './academy/academySchedule.component';
import { AcademyTandCComponent } from './academy/academyTandC.component';
import { LeagueRepublicTable } from './lrTable/leagueRepublicTable.component';
import { LeagueRepublicResults } from './lrResults/leagueRepublicResults.component';
import { FarViewComponent } from './farView/farView.component';
import { AdminHomeComponent } from './admin/adminHome.component';
import { AdminOverviewComponent } from './admin/adminOverview.component';
import { AdminTutorialsComponent } from './admin/adminTutorials.component';
import { AdminMembersComponent } from './admin/adminMembers.component';
import { AdminUsersComponent } from './admin/adminUsers.component';
import { EditMemberComponent } from './admin/member/editMember.component';
import { CoachesAreaComponent } from './admin/adminCoachesArea.component';
import { PhotosComponent } from './photos/photos.component';

import { RequestInterceptor } from '../config/interceptors/request.interceptor';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SessionDataService } from './services/session-data.service';
import { LoginService } from './services/login.service';
import { NewsService }  from './services/news.service';
import { LoggerService } from './services/logger.service';
import { CommonService } from './services/common.service';
import { ErrorService } from './services/error.service';
import { UserService } from './services/user.service';
import { MemberService } from './services/member.service';
import { AcademyRegistrationService }  from './academy/academyRegistration.service';

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SponsorsComponent,
    NewsComponent,
    Slide,
    Carousel,
    MerchandiseComponent,
    AcademyHomeComponent,
    AcademyOverviewComponent,
    AcademyCoachesComponent,
    AcademyScheduleComponent,
    FindUsComponent,
    MessageUsComponent,
    ContactUsComponent,
    DownloadsComponent,
    LinksComponent,
    ClubHistoryComponent,
    LoginComponent,
    ViewTeamComponent,
    FarViewComponent,
    AcademyMemberPaymentComponent,
    AcademyRegistrationComponent,
    AcademyTandCComponent,
    LeagueRepublicTable,
    LeagueRepublicResults,
    AdminHomeComponent,
    AdminOverviewComponent,
    AdminTutorialsComponent,
    AdminMembersComponent,
    AdminUsersComponent,
    EditMemberComponent,
    CoachesAreaComponent,
    PhotosComponent
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CovalentCoreModule.forRoot(),
    CovalentChartsModule.forRoot(),
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    CovalentHighlightModule.forRoot(),
    CovalentMarkdownModule.forRoot(),
    appRoutes,
    NgxChartsModule,
  ], // modules needed to run this module
  providers: [
    appRoutingProviders,
    httpInterceptorProviders,
    Title,
    SessionDataService,
    LoggerService,
    CommonService,
    ErrorService,
    AcademyRegistrationService,
    LoginService,
    UserService,
    NewsService,
    MemberService
  ], // additional providers needed for this module
  entryComponents: [ ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
