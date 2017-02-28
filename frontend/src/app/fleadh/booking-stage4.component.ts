import { Component }      from '@angular/core';
import { Router }         from '@angular/router';
import { FormBuilder,  
         FormGroup }      from '@angular/forms';

import { LoggerService }  from '../services/logger.service';
import { BookingService } from './booking.service';
import { ErrorService }   from '../services/error.service';

@Component({
    templateUrl: './html/booking-stage4.component.html',
    styleUrls: ['./css/booking-stage4.component.css']
})

export class BookingStage4Component {
    step1enabled: boolean;
    step2enabled: boolean;
    step3enabled: boolean;
    step4enabled: boolean;
    step5enabled: boolean;
     bookingForm: FormGroup;

    constructor( private lg$: LoggerService,
                 private bkng$: BookingService,
                 private err$: ErrorService, 
                 private router: Router,
                 fb: FormBuilder )
    {
        this.step1enabled = false;
        this.step2enabled = false;
        this.step3enabled = false;
        this.step4enabled = true;
        this.step5enabled = false;
        
        this.bookingForm = fb.group({
			firstname: [''],
			surname: [''],
			email: [''],
			phone: [''],
            country: [''],
            vehicalReg: ['']
		});
    }

    private back() {
        this.lg$.log("-> back()");
		this.router.navigate(['/booking-stage3']);
    }

    private submit(form)
    {
        this.bkng$.firstname = form.firstname;
        this.bkng$.surname = form.surname;
        this.bkng$.email = form.email;
        this.bkng$.country = form.country;
        this.bkng$.phone = form.phone;
        this.bkng$.vehicalReg = form.vehicalReg;
        this.lg$.log("-> next()");
        this.lg$.log("---- Arrival Date: " + this.bkng$.arrivalDate );
		this.lg$.log("---- Departure Date: " + this.bkng$.departureDate );
		this.lg$.log("---- Number of People: " + this.bkng$.numberOfPeople );
		this.lg$.log("---- Car parking: " + this.bkng$.parking);
		this.lg$.log("---- T&C accepted: " + this.bkng$.tandc);;
        this.lg$.log("---- firstname: " + this.bkng$.firstname);
        this.lg$.log("---- surname: " + this.bkng$.surname);
        this.lg$.log("---- country: " + this.bkng$.country);;
        this.lg$.log("---- email: " + this.bkng$.email);
        this.lg$.log("---- phone: " + this.bkng$.phone);
        this.router.navigate(['/booking-stage5']);

    }
}