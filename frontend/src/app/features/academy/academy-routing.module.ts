import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademyNewsComponent } from './academy-news/academy-news.component';
import { AcademyOverviewComponent } from './academy-overview/academy-overview.component';
import { AcademyCoachesComponent } from './academy-coaches/academy-coaches.component';
import { AcademyScheduleComponent } from './academy-schedule/academy-schedule.component';
import { AcademyRegistrationComponent } from './academy-registration/academy-registration.component';
import { AcademyRegistrationFormComponent } from './academy-registration/academy-registration-form/academy-registration-form.component';

const routes: Routes = [
  { path: 'academyNews', component: AcademyNewsComponent },
  { path: 'academyOverview', component: AcademyOverviewComponent },
  { path: 'academyCoaches', component: AcademyCoachesComponent},
  { path: 'academySchedule', component: AcademyScheduleComponent },
  { path: 'academyRegistration', component: AcademyRegistrationComponent },
  { path: 'academyRegistrationForm', component: AcademyRegistrationFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademyRoutingModule { }
