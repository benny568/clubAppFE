import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademyHomeComponent }          from './academyHome.component';
import { AcademyOverviewComponent }      from './academyOverview.component';
import { AcademyCoachesComponent }       from './academyCoaches.component';
import { AcademyScheduleComponent }      from './academySchedule.component';
import { AcademyTandCComponent }         from './academyTandC.component';
import { AcademyRegistrationComponent }  from './academyRegistration.component';
import { AcademyMemberPaymentComponent } from './academyMemberPayment.component';

const academyRoutes: Routes = [
		{ path: 'academyHome', component: AcademyHomeComponent },
		{ path: 'academyOverview', component: AcademyOverviewComponent },
		{ path: 'academyCoaches', component: AcademyCoachesComponent },
		{ path: 'academySchedule', component: AcademyScheduleComponent },
		{ path: 'academyTandC', component: AcademyTandCComponent },
		{ path: 'academyPayment', component: AcademyMemberPaymentComponent }
	];

@NgModule({
  imports: [RouterModule.forChild(academyRoutes)],
  exports: [RouterModule]
})
export class AcademyRoutingModule {}