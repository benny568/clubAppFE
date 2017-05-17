import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AcademyHomeComponent }          from './academyHome.component';
import { AcademyOverviewComponent }      from './academyOverview.component';
import { AcademyCoachesComponent }       from './academyCoaches.component';
import { AcademyScheduleComponent }      from './academySchedule.component';
import { AcademyTandCComponent }         from './academyTandC.component';
import { AcademyRegistrationComponent }  from './academyRegistration.component';
import { AcademyMemberPaymentComponent } from './academyMemberPayment.component';
import { AcademyRegistrationService }    from './academyRegistration.service';
import { LoggerService }                 from '../../services/logger.service';

@NgModule({
    imports: [ CommonModule,
               FormsModule
             ],
    declarations: [ AcademyHomeComponent,
                    AcademyOverviewComponent,
                    AcademyCoachesComponent,
                    AcademyScheduleComponent,
                    AcademyTandCComponent,
                    AcademyRegistrationComponent,
                    AcademyMemberPaymentComponent
                  ],
    providers: [ AcademyRegistrationService,
                 LoggerService
               ]
})

export class AcademyModule {}