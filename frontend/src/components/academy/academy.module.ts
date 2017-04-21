import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AcademyRoutingModule }          from './academy-routes.module';
import { AcademyHomeComponent }          from './academyHome.component';
import { AcademyOverviewComponent }      from './academyOverview.component';
import { AcademyCoachesComponent }       from './academyCoaches.component';
import { AcademyScheduleComponent }      from './academySchedule.component';
import { AcademyTandCComponent }         from './academyTandC.component';
import { AcademyRegistrationComponent }  from './academyRegistration.component';
import { AcademyMemberPaymentComponent } from './academyMemberPayment.component';
import { AcademyRegistrationService }    from './academyRegistration.service';

@NgModule({
    imports: [ CommonModule,
               FormsModule, 
               AcademyRoutingModule 
             ],
    declarations: [ AcademyHomeComponent,
                    AcademyOverviewComponent,
                    AcademyCoachesComponent,
                    AcademyScheduleComponent,
                    AcademyTandCComponent,
                    AcademyRegistrationComponent,
                    AcademyMemberPaymentComponent
                  ],
    providers: [ AcademyRegistrationService ]
})

export class AcademyModule {}