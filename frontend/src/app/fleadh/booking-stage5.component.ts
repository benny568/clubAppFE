import { Component }      from '@angular/core';
import { OnInit }         from '@angular/core';
import { Router }         from '@angular/router';

import { LoggerService }  from '../services/logger.service';
import { BookingService } from './booking.service';
import { ErrorService }   from '../services/error.service';

@Component({
    templateUrl: './html/booking-stage5.component.html',
    styleUrls: ['./css/booking-stage5.component.css']
})

export class BookingStage5Component implements OnInit {
    step1enabled: boolean;
    step2enabled: boolean;
    step3enabled: boolean;
    step4enabled: boolean;
    step5enabled: boolean;
    arrivaldate;
    departuredate;

    constructor( private lg$: LoggerService,
                 private bkng$: BookingService,
                 private err$: ErrorService, 
                 private router: Router )
    {
        this.step1enabled = false;
        this.step2enabled = false;
        this.step3enabled = false;
        this.step4enabled = false;
        this.step5enabled = true;
    }

    ngOnInit() {
        this.calculateTotalCharge();      
    }

    private back() {
        this.lg$.log("-> back()");
		this.router.navigate(['/booking-stage4']);
    }

    private next()
    {
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
        this.lg$.log("---- phone: " + this.bkng$.phone)
        this.router.navigate(['/home']);

    }

    calculateTotalCharge()
	{
		// Total up the charge
        // (€35 * number of nights) +
        // (€5 for each additional person over 2) +
        // (
		/*let from:number = + ( this.bkng$.arrivalDate.slice( 0, 2 ) );
		let to:number = + ( this.bkng$.departureDate.slice( 0, 2 ) );
		this.bkng$.numberOfNights = ( to - from );*/
		let extraPeople:number = this.bkng$.numberOfPeople - 2;
		// Basic cost for 2 nights is €40/night, for 3 nights + it's €35/night
		let basic = this.bkng$.numberOfNights < 3 ? (40 * this.bkng$.numberOfNights) : (35 * this.bkng$.numberOfNights);
		let extraPeopleFee:number = 0;
		let extraCarFee:number = 0;
		
		if ( extraPeople > 0 )
		{
			extraPeopleFee = extraPeople * 5 * this.bkng$.numberOfNights; // €5 extra per night per extra person
		}
		if ( this.bkng$.parking > 1 )
		{
			extraCarFee = (this.bkng$.parking - 1) * 5 * this.bkng$.numberOfNights; // €5 extra per night per extra car
		}
		
		this.bkng$.totalCharge = basic + extraPeopleFee + extraCarFee;
		
		this.bkng$.deposit = this.bkng$.numberOfNights === 1 ? 40 : 50;
		//this.bkng$.deposit = 50; //this.bkng$.totalCharge/2;
		
		this.lg$.trace("---- Num Nights: " + this.bkng$.numberOfNights);
		this.lg$.trace("---- Basic charge: " + basic);
		this.lg$.log("---- Total Charge: " + this.bkng$.totalCharge);
	}
	
	payPal()
	{
		this.lg$.log("-> payPal()");
		
		// The user has pressed pay, so store their info as pending
		
		// Call the PayPal interface
		this.bkng$.payPal();
	}
}