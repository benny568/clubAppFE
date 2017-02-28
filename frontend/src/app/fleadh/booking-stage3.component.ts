import { Component } from '@angular/core';
import { Router }    from '@angular/router';

import { LoggerService }  from '../services/logger.service';
import { BookingService } from './booking.service';
import { ErrorService }    from '../services/error.service';

@Component({
    templateUrl: './html/booking-stage3.component.html',
    styleUrls: ['./css/booking-stage3.component.css']
})

export class BookingStage3Component {
    step1enabled: boolean;
    step2enabled: boolean;
    step3enabled: boolean;
    step4enabled: boolean;
    step5enabled: boolean;

    constructor( private lg$: LoggerService,
                 private bkng$: BookingService,
                 private err$: ErrorService, 
                 private router: Router )
    {
        this.step1enabled = false;
        this.step2enabled = false;
        this.step3enabled = true;
        this.step4enabled = false;
        this.step5enabled = false;
    }

    private back() {
        this.lg$.log("-> back()");
		this.router.navigate(['/booking-stage2']);
    }

    private next()
    {
        this.lg$.log("-> next()");
        this.lg$.log("---- Arrival Date: " + this.bkng$.arrivalDate );
		this.lg$.log("---- Departure Date: " + this.bkng$.departureDate );
		this.lg$.log("---- Number of People: " + this.bkng$.numberOfPeople );
		this.lg$.log("---- Car parking: " + this.bkng$.parking);
		this.lg$.log("---- T&C accepted: " + this.bkng$.tandc);
        this.router.navigate(['/booking-stage4']);

    }
}