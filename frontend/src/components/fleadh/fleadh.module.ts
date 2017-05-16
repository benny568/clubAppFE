import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

import { FleadhHomeComponent } from './fleadhHome.component';
import { BookingStage2Component } from './booking-stage2.component';
import { BookingStage3Component } from './booking-stage3.component';
import { BookingStage4Component } from './booking-stage4.component';
import { NumberOfPeople4ParkingComponent } from './number-of-people-4parking.component';
import { TandCComponent } from './tandc.component';
import { InstructionsComponent } from './instructions.component';
import { ArrivalDatepickerComponent } from './arrival-datepicker.component';
import { DepartureDatepickerComponent } from './departure-datepicker.component';
import { NumberOfPeopleComponent } from './number-of-people.component';
import { SuccessComponent } from './success.component';
import { BookingService } from '../../services/booking.service';

@NgModule({
    declarations: [
        FleadhHomeComponent,
        BookingStage2Component,
        BookingStage3Component,
        BookingStage4Component,
        NumberOfPeople4ParkingComponent,
        TandCComponent,
        InstructionsComponent,
        ArrivalDatepickerComponent,
        DepartureDatepickerComponent,
        NumberOfPeopleComponent,
        SuccessComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        CheckboxModule,
        ButtonModule,
        DialogModule,
        TabViewModule,
        SpinnerModule,
        MessagesModule,
        GrowlModule,
        TooltipModule,
        CalendarModule
    ],
    providers: [
        BookingService
    ]
})

export class FleadhModule {}