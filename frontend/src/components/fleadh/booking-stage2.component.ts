import { Component } from '@angular/core';
import { Router }    from '@angular/router';

import { LoggerService }  from '../../services/logger.service';
import { BookingService } from '../../services/booking.service';
import { ErrorService }    from '../../services/error.service';
import { NumberOfPeople4ParkingComponent } from './number-of-people-4parking.component';

import '../../assets/img/fleadh/parking.png';

const YearPart: number = 0;
const MonthPart: number = 1;
const DayPart: number = 2;

@Component({
    templateUrl: './html/booking-stage2.component.html',
    styleUrls: ['./css/booking-stage2.component.css']
})

export class BookingStage2Component {
    step1enabled: boolean;
    step2enabled: boolean;
    step3enabled: boolean;
    step4enabled: boolean;
    parkingRequired: boolean;

    constructor( private lg$: LoggerService,
                 private bkng$: BookingService,
                 private err$: ErrorService, 
                 private router: Router )
    {
        this.step1enabled = false;
        this.step2enabled = true;
        this.step3enabled = false;
        this.step4enabled = false;
        this.parkingRequired = false;
    }

    private back() {
        this.lg$.log("-> back()");
		this.router.navigate(['/fleadh']);
    }

    private next()
    {
        if( !this.parkingRequired )
            this.bkng$.parking = 0;
       this.bkng$.traceBookingDetails();

       this.router.navigate(['/booking-stage3']);
    }

   
}