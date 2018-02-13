import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CovalentModule } from './../../covalent.module';
import { MaterialModule } from './../../material.module';

import { AcademyRegistrationService } from './academy-registration/academy-registration.service';

import { AcademyRoutingModule } from './academy-routing.module';
import { AcademyNewsComponent } from './academy-news/academy-news.component';
import { AcademyOverviewComponent } from './academy-overview/academy-overview.component';
import { AcademyCoachesComponent } from './academy-coaches/academy-coaches.component';
import { AcademyScheduleComponent } from './academy-schedule/academy-schedule.component';
import { AcademyRegistrationComponent } from './academy-registration/academy-registration.component';
import { AcademyRegistrationFormComponent } from './academy-registration/academy-registration-form/academy-registration-form.component';
import { AcademyRegistrationPaymentComponent } from './academy-registration/academy-registration-payment/academy-registration-payment.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CovalentModule,
    AcademyRoutingModule
  ],
  providers: [
    AcademyRegistrationService
  ],
  declarations: [
    AcademyNewsComponent, 
    AcademyOverviewComponent, 
    AcademyCoachesComponent, 
    AcademyScheduleComponent, 
    AcademyRegistrationComponent,
    AcademyRegistrationFormComponent,
    AcademyRegistrationPaymentComponent
  ]
})
export class AcademyModule { }
