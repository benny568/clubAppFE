import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademyNewsComponent } from './academy-news/academy-news.component';
import { AcademyOverviewComponent } from './academy-overview/academy-overview.component';
import { AcademyCoachesComponent } from './academy-coaches/academy-coaches.component';
import { AcademyScheduleComponent } from './academy-schedule/academy-schedule.component';
import { AcademyRegistrationComponent } from './academy-registration/academy-registration.component';
import { AcademyRegistrationFormComponent } from './academy-registration/academy-registration-form/academy-registration-form.component';
import { AcademyRegistrationPaymentComponent } from './academy-registration/academy-registration-payment/academy-registration-payment.component';
import { AcademyRegistrationSuccessComponent } from './academy-registration-success/academy-registration-success.component';

const routes: Routes = [
  { path: 'academyNews', component: AcademyNewsComponent },
  { path: 'academyOverview', component: AcademyOverviewComponent },
  { path: 'academyCoaches', component: AcademyCoachesComponent},
  { path: 'academySchedule', component: AcademyScheduleComponent },
  { path: 'academyRegistration', component: AcademyRegistrationComponent },
  { path: 'academyRegistrationForm', component: AcademyRegistrationFormComponent },
  { path: 'academyRegistrationPayment', component: AcademyRegistrationPaymentComponent },
  { path: 'success', component: AcademyRegistrationSuccessComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademyRoutingModule { }
