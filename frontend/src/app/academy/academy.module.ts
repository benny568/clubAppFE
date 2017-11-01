import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademyRoutingModule } from './academy-routing.module';
import { AcademyNewsComponent } from './academy-news/academy-news.component';
import { AcademyOverviewComponent } from './academy-overview/academy-overview.component';
import { AcademyCoachesComponent } from './academy-coaches/academy-coaches.component';
import { AcademyScheduleComponent } from './academy-schedule/academy-schedule.component';
import { AcademyRegistrationComponent } from './academy-registration/academy-registration.component';

@NgModule({
  imports: [
    CommonModule,
    AcademyRoutingModule
  ],
  declarations: [AcademyNewsComponent, AcademyOverviewComponent, AcademyCoachesComponent, AcademyScheduleComponent, AcademyRegistrationComponent]
})
export class AcademyModule { }
