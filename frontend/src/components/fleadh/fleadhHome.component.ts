import { Component }      from '@angular/core';
import { Router }         from '@angular/router';

import { Message } from 'primeng/primeng';

import { LoggerService }  from '../../services/logger.service';
import { BookingService } from '../../services/booking.service';
import { ErrorService }    from '../../services/error.service';

@Component({
    template: require('./html/fleadhHome.component.html'),
    styles: [require('./css/fleadhHome.component.css').toString()]
})

export class FleadhHomeComponent {
    tandc: boolean;
    step1enabled: boolean;
    step2enabled: boolean;
    step3enabled: boolean;
    step4enabled: boolean;
    msgs: Message[] = [];

    constructor( private lg$: LoggerService,
                 private bkng$: BookingService,
                 private err$: ErrorService, 
                 private router: Router ) 
    {
        this.tandc = false;
        this.step1enabled = true;
        this.step2enabled = false;
        this.step3enabled = false;
        this.step4enabled = false;
    }

    private back() {
        this.lg$.log("-> back()");
		this.router.navigate(['/home']);
    }

    private next()
    {
        this.lg$.log("-> next()");
        this.lg$.log(this.bkng$.tandc);
        if( !this.bkng$.tandc )
        {
            this.showTnCError();
        }
        else
        {
            /*this.bkng$.tandc = this.tandc === true ? 1 : 0;*/
            this.bkng$.numberOfNights = this.calcNumberOfNights( this.bkng$.arrivalDate, this.bkng$.departureDate) ;
            this.lg$.log("-> next()");
            this.lg$.log("---- Arrival Date: " + this.bkng$.arrivalDate );
    		this.lg$.log("---- Departure Date: " + this.bkng$.departureDate );
    		this.lg$.log("---- Number of nights: " + this.bkng$.numberOfNights );
            this.lg$.log("---- Number of People: " + this.bkng$.numberOfPeople );
    		this.lg$.log("---- Car parking: " + this.bkng$.parking);
    		this.lg$.log("---- T&C accepted: " + this.bkng$.tandc);
    
            if( this.bkng$.numberOfNights !== -1 && this.numberOfPeopleOK(this.bkng$.numberOfPeople) )
                this.router.navigate(['/booking-stage2']);
        }
    }

    private calcNumberOfNights( startdate: Date, enddate: Date ) 
    {
        this.bkng$.traceBookingDetails();

        this.lg$.log("calcNumberOfNights( startdate: " + startdate + ", enddate: " + enddate + " )");

        if( startdate === undefined )
        {
            this.showStartDateError();
            return -1;
        }
        else if( enddate === undefined )
        {
            this.showEndDateError();
            return -1;
        }
        else
        // Check the Year - must be 2017
        if( startdate.getFullYear() !== 2017 || enddate.getFullYear() !== 2017 )
        {
            this.showYearError();
            return -1;
            // Check the month
        } else if( startdate.getMonth() !== 7 || enddate.getMonth() !== 7 ) /* NOTE: Months start at 0 */
        {
            this.showMonthError();
            return -1;
        }
        else
        {   // Check the number of nights
            let nights = ( enddate.getDate() - startdate.getDate() );
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
        this.msgs.pop(); // Remove any old message
        this.msgs.push({    severity:'info', 
                            summary:'Info Message', 
                            detail:'The selected date must be in 2017!'
                        });
    }

    private showMonthError() {
    	this.lg$.log("----> showMonthError()");
        this.msgs.pop(); // Remove any old message
        this.msgs.push({    severity:'info', 
                            summary:'Info Message', 
                            detail:'The selected month must be August!'
                        });
    }

    private showDaysError() {
    	this.lg$.log("----> showDaysError()");
        this.msgs.pop(); // Remove any old message
        this.msgs.push({    severity:'info', 
                            summary:'Info Message', 
                            detail:'Minimum stay is 2 nights!'
                        });
    }

    private showPeopleError() {
    	this.lg$.log("----> showPeopleError()");
        this.msgs.pop(); // Remove any old message
        this.msgs.push({    severity:'info', 
                            summary:'Info Message', 
                            detail:'Minimum number of people is 1!'
                        });
    }

    private showTnCError() {
    	this.lg$.log("----> showTnCError()");
        this.msgs.pop(); // Remove any old message
        this.msgs.push({    severity:'info', 
                            summary:'Info Message', 
                            detail:'You must accept the Terms & Conditions to proceed!'
                        });
    }

    private showStartDateError() {
    	this.lg$.log("----> showStartDateError()");
        this.msgs.pop(); // Remove any old message
        this.msgs.push({    severity:'info', 
                            summary:'Info Message', 
                            detail:'You must enter a start date to proceed!'
                        });
    }

    private showEndDateError() {
    	this.lg$.log("----> showEndDateError()");
        this.msgs.pop(); // Remove any old message
        this.msgs.push({    severity:'info', 
                            summary:'Info Message', 
                            detail:'You must enter an end date to proceed!'
                        });
    }
}