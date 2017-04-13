import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { MdCheckboxModule } from '@angular/material';

/* PrimeNG components */
import { CheckboxModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { SpinnerModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
/* ********************************************* */

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
import { FleadhHomeComponent } from './components/fleadh/fleadhHome.component';
import { AdvertComponent } from './components/advert/advert.component';
import { BookingStage2Component } from './components/fleadh/booking-stage2.component';
import { BookingStage3Component } from './components/fleadh/booking-stage3.component';
import { BookingStage4Component } from './components/fleadh/booking-stage4.component';
import { BookingStage5Component } from './components/fleadh/booking-stage5.component';
import { NumberOfPeople4ParkingComponent } from './components/fleadh/number-of-people-4parking.component';
import { TandCComponent } from './components/fleadh/tandc.component';
import { InstructionsComponent } from './components/fleadh/instructions.component';
import { ArrivalDatepickerComponent } from './components/fleadh/arrival-datepicker.component';
import { DepartureDatepickerComponent } from './components/fleadh/departure-datepicker.component';
import { NumberOfPeopleComponent } from './components/fleadh/number-of-people.component';
import { AcademyRoutingModule }          from './components/academy/academy-routes.module';
import { AcademyHomeComponent }          from './components/academy/academyHome.component';
import { AcademyOverviewComponent }      from './components/academy/academyOverview.component';
import { AcademyCoachesComponent }       from './components/academy/academyCoaches.component';
import { AcademyScheduleComponent }      from './components/academy/academySchedule.component';
import { AcademyTandCComponent }         from './components/academy/academyTandC.component';
import { AcademyRegistrationComponent }  from './components/academy/academyRegistration.component';
import { AcademyMemberPaymentComponent } from './components/academy/academyMemberPayment.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SessionDataService } from './services/session-data.service';
import { LoginService } from './services/login.service';
import { NewsService }  from './services/news.service';
import { LoggerService } from './services/logger.service';
import { CommonService } from './services/common.service';
import { ErrorService } from './services/error.service';
import { UserService } from './services/user.service';
import { MemberService } from './services/member.service';
import { AcademyRegistrationService }  from './components/academy/academyRegistration.service';
import { BookingService } from './services/booking.service';

/* Feature Modules */
/*import { AcademyModule } from './components/academy/academy.module';*/
/*import { AcademyRoutingModule } from './components/academy/academy-routes.module';*/

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
    FleadhHomeComponent,
    AdvertComponent,
    BookingStage2Component,
    BookingStage3Component,
    BookingStage4Component,
    BookingStage5Component,
    NumberOfPeople4ParkingComponent,
    TandCComponent,
    InstructionsComponent,
    ArrivalDatepickerComponent,
    DepartureDatepickerComponent,
    NumberOfPeopleComponent,
    AcademyHomeComponent,
    AcademyOverviewComponent,
    AcademyCoachesComponent,
    AcademyScheduleComponent,
    AcademyTandCComponent,
    AcademyRegistrationComponent,
    AcademyMemberPaymentComponent
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MdCheckboxModule,
    CheckboxModule,
    ButtonModule,
    DialogModule,
    TabViewModule,
    SpinnerModule,
    MessagesModule,
    GrowlModule,
    TooltipModule,
    CalendarModule
  ], // modules needed to run this module
  providers: [
    Title,
    SessionDataService,
    LoggerService,
    CommonService,
    ErrorService,
    AcademyRegistrationService,
    LoginService,
    UserService,
    NewsService,
    MemberService,
    BookingService
  ], // additional providers needed for this module
  entryComponents: [ ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
