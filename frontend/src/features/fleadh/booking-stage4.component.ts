import { Component }      from '@angular/core';
import { Router }         from '@angular/router';
import { FormBuilder,  
         FormGroup }      from '@angular/forms';

import { LoggerService }  from '../../services/logger.service';
import { BookingService } from '../../services/booking.service';
import { ErrorService }   from '../../services/error.service';

enum ValidValue { FORM, SERVICE, NONE };
@Component({
    templateUrl: './html/booking-stage4.component.html',
    styleUrls: ['./css/booking-stage4.component.css']
})

export class BookingStage4Component {
	componentName:string = 'BookingStage4Component';
	logdepth:number = 4;

	constructor( private lg$: LoggerService, private bkng$: BookingService, private router: Router  ) {}
	
	ngOnInit() {
    	this.lg$.setLogHdr(this.logdepth, this.componentName);
        this.lg$.log("ngOnInit()");
        
        if ( this.bkng$.parking === undefined )
        {
        	this.bkng$.parking = 0;
        }
        
        // Total up the charge       
        this.calculateTotalCharge();
        
	}

	submit()
	{
		this.lg$.log("---- Arrival Date: " + this.bkng$.arrivalDate );
		this.lg$.log("---- Departure Date: " + this.bkng$.departureDate );
		this.lg$.log("---- Number of People: " + this.bkng$.numberOfPeople );
		this.lg$.log("---- Car parking: " + this.bkng$.parking);
	}
	
	calculateTotalCharge()
	{
        this.lg$.trace("calculateTotalCharge()");
		// Total up the charge
        // (€35 * number of nights) +
        // (€5 for each additional person over 2) +

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
	
	back()
	{
		this.lg$.log("-> back()");
		this.router.navigate(['/booking-stage3']);
	}
	
	payPal()
	{
		this.lg$.log("-> payPal()");
		
		// The user has pressed pay, so store their info as pending
		
		// Call the PayPal interface
		this.bkng$.payPal();
	}
	
}