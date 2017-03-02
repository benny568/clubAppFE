import { Component } from '@angular/core';
import { Router }    from '@angular/router';

import { LoggerService }  from '../services/logger.service';
import { BookingService } from './booking.service';
import { ErrorService }    from '../services/error.service';

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
    arrivaldate;
    departuredate;

    constructor( private lg$: LoggerService,
                 private bkng$: BookingService,
                 private err$: ErrorService, 
                 private router: Router )
    {
        this.step1enabled = false;
        this.step2enabled = true;
        this.step3enabled = false;
        this.step4enabled = false;
    }

    private back() {
        this.lg$.log("-> back()");
		this.router.navigate(['/fleadh']);
    }

    private next()
    {
        this.bkng$.numberOfNights = this.calcNumberOfNights( this.bkng$.arrivalDate, this.bkng$.departureDate) ;
        this.lg$.log("-> next()");
        this.lg$.log("---- Arrival Date: " + this.bkng$.arrivalDate );
		this.lg$.log("---- Departure Date: " + this.bkng$.departureDate );
		this.lg$.log("---- Number of People: " + this.bkng$.numberOfPeople );
		this.lg$.log("---- Car parking: " + this.bkng$.parking);
		this.lg$.log("---- T&C accepted: " + this.bkng$.tandc);

        if( this.bkng$.numberOfNights !== -1 && this.numberOfPeopleOK(this.bkng$.numberOfPeople) )
            this.router.navigate(['/booking-stage3']);
    }

    private calcNumberOfNights( startdate:string, enddate: string ) 
    {
        let aparts = startdate.split('-');
        let eparts = enddate.split('-');
        
        // Check the Year - must be 2017
        if( aparts[YearPart] !== '2017' || eparts[YearPart] !== '2017' )
        {
            this.showYearError();
            return -1;
            // Check the month
        } else if( aparts[MonthPart] !== '08' || eparts[MonthPart] !== '08' ) 
        {
            this.showMonthError();
            return -1;
        }
        else
        {   // Check the number of nights
            let nights = ( parseInt(eparts[DayPart]) - parseInt(aparts[DayPart]) );
            if( nights < 2 )
            {
                this.showDaysError();
                return -1;
            }
            else
            {
                return nights;
            }
        }
    }

    private numberOfPeopleOK( numberOfPeople: number ) {
        if( numberOfPeople < 1 )
        {
            this.showPeopleError();
            return false;
        }
        else {
            return true;
        }
    }

    private showYearError() {
    	this.lg$.log("----> showYearError()");
        this.err$.openAlert('The selected date must be in 2017!');
    }

    private showMonthError() {
    	this.lg$.log("----> showMonthError()");
        this.err$.openAlert('The selected month must be August!');
    }

    private showDaysError() {
    	this.lg$.log("----> showDaysError()");
        this.err$.openAlert('Minimum stay is 2 nights!');
    }

    private showPeopleError() {
    	this.lg$.log("----> showPeopleError()");
        this.err$.openAlert('Minimum number of people is 1!');
    }
}