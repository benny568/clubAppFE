import { Component }      from '@angular/core';
import { Router }         from '@angular/router';
import { FormBuilder,  
         FormGroup }      from '@angular/forms';

import { Message }        from 'primeng/primeng';

import { LoggerService }  from '../../services/logger.service';
import { BookingService } from '../../services/booking.service';
import { ErrorService }   from '../../services/error.service';

enum ValidValue { FORM, SERVICE, NONE };
@Component({
    templateUrl: './html/booking-stage3.component.html',
    styleUrls: ['./css/booking-stage3.component.css']
})

export class BookingStage3Component {
    componentName:string = 'BookingStage3Component';
	logdepth:number = 4;
    msgs: Message[] = [];
    bookingForm: FormGroup;
    allOk: boolean = true;

    constructor( private lg$: LoggerService,
                 public bkng$: BookingService,
                 private err$: ErrorService, 
                 private router: Router,
                 fb: FormBuilder )
    {        
        this.bookingForm = fb.group({
			firstname: [''],
			surname: [''],
			email: [''],
			phone: [''],
            country: [''],
            vehicalReg: ['']
		});

        /* Initialise placeholders */
        /*this.bkng$.firstname = 'Enter your first name';
        this.bkng$.surname = 'Enter your surname';
        this.bkng$.email = 'Enter your email';
        this.bkng$.phone = 'Enter your mobile number';
        this.bkng$.country = 'Enter your country of origin';
        this.bkng$.vehicalReg = 'Enter your car reg';*/
    }

	ngOnInit() {
    	this.lg$.setLogHdr(this.logdepth, this.componentName);
        this.lg$.log("ngOnInit()");
	}

    public back() {
        this.lg$.log("-> back()");
		this.router.navigate(['/booking-stage2']);
    }

	public submit( value: any )
	{
		if ( !this.checkName( value.firstname ) && !this.checkName( this.bkng$.firstname ) )
		{
			this.showFNError();
			return;
		}
		
		if ( !this.checkName( value.surname ) && !this.checkName( this.bkng$.surname ) )
		{
			this.showsSNError();
			return;
		}
		
		if ( !this.checkEmail( value.email ) && !this.checkEmail( this.bkng$.email ) )
		{
			this.showEmailError();
			return;
		}
		
		if ( !this.checkPh( value.phone ) && !this.checkPh( this.bkng$.phone ) )
		{
			this.showPhError();
			return;
		}
		
        /* Take which ever value is valid, remember the user may have gone back and forward through the windows */

        this.lg$.trace("this.bkng$.firstname: " + this.bkng$.firstname);
        this.lg$.trace("value.firstname: " + value.firstname);

        if( !(value.firstname === undefined) && !(value.firstname === '') )
		    this.bkng$.firstname = value.firstname;
        this.lg$.trace("this.bkng$.firstname after: " + this.bkng$.firstname);

        if( !(value.surname === undefined) && !(value.surname === '') )
            this.bkng$.surname = value.surname;
        if( !(value.email === undefined) && !(value.email === '') )
            this.bkng$.email = value.email;
        if( !(value.phone === undefined) && !(value.phone === '') )
            this.bkng$.phone = value.phone;
        if( !(value.country === undefined) && !(value.country === '') )
            this.bkng$.country = value.country;
		if( !(value.vehicalReg === undefined) && !(value.vehicalReg === '') )
            this.bkng$.vehicalReg = value.vehicalReg;

		this.bkng$.traceBookingDetails();

		this.router.navigate(['/booking-stage4']);
	}
	
	private checkName( name: string ) : boolean
	{
		this.lg$.log("----> checkName(" + name + ")");
		
		if ( ( name !== undefined ) && ( name !== '' ) )
		{
			return /^\w+/.test(name);
		} else
		{
			this.lg$.log("----> checkName(" + name + ") undefined or blank!");
			return false;
		}
	}
	
	private checkEmail( email: string ) : boolean
	{
		this.lg$.log("----> checkEmail(" + email + ")");
		
		if ( ( email !== undefined ) && ( email !== '' ) )
		{
			// Commented out the reg exp as it's giving an error in lint, line too long. Need to split if possible
			return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(email);
		} else
		{
			this.lg$.log("----> checkEmail(" + email + ") undefined or blank!");
			return false;
		}
	}
	
	private checkPh( phone: string ) : boolean
	{
		this.lg$.log("----> checkPh(" + phone + ")");
		this.lg$.log("== " + /^\d{10}$/.test(phone) );
		this.lg$.log("== " + /^\+\d{12}$/.test(phone) );
		
		if ( ( phone !== undefined ) && ( phone !== '' ) )
		{
			/*if ( (/^\d{10}$/.test(phone)) || (/^\+\d{12}$/.test(phone)) )
			{
				return true;
			} else
			{
				return false;
			}*/
			
			// Removing checks, once it is entered we'll take it
			return true;
			
		} else
		{
			this.lg$.log("----> checkPh(" + phone + ") undefined or blank!");
			return false;
		}
	}
	
	private showFNError() {
    	this.lg$.log("----> showFNError()");
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Error:', detail:'You must enter a valid first name!'});
    }
	
	private showsSNError() {
    	this.lg$.log("----> showSNError()");
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Error:', detail:'You must enter a valid surname!'});
    }
	
	private showEmailError() {
    	this.lg$.log("----> showEmailError()");
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Error:', detail:'You must enter a valid email address!'});
    }
	
	private showPhError() {
    	this.lg$.log("----> showPhError()");
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Error:', detail:'You must enter a valid phone number!'});
    }
	
}