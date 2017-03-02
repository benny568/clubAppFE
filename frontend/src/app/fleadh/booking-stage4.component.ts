import { Component }      from '@angular/core';
import { Router }         from '@angular/router';
import { FormBuilder,  
         FormGroup }      from '@angular/forms';

import { LoggerService }  from '../services/logger.service';
import { BookingService } from './booking.service';
import { ErrorService }   from '../services/error.service';

enum ValidValue { FORM, SERVICE, NONE };
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
    allOk: boolean = true;

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
        this.saveDetailsAndMoveOn(form);
    }

    private saveDetailsAndMoveOn(form) 
    {
        // Check firstname
        if( this.checkFName(form.firstname, this.bkng$.firstname) )
        {
            // Check the Surname
            if( this.checkSName(form.surname, this.bkng$.surname) )
            {
                // Check the email
                if( this.checkEmail(form.email, this.bkng$.email) )
                {
                    if( this.checkPh( form.phone, this.bkng$.phone ) )
                    {
                        this.allOk = true;
                        // Just check which to use from the following
                        this.checkCountry( form.country, this.bkng$.country );
                        this.checkCarReg( form.vehicalReg, this.bkng$.vehicalReg );
                    }
                    else
                    {
                        this.allOk = false;
                        this.showPhError();
                    }
                }
                else
                {
                    this.allOk = false;
                    this.showEmailError();
                }
            }
            else
            {
                this.allOk = false;
                this.showsSNError();
            }
        }
        else
        {
            this.allOk = false;
            this.showFNError();
        }


        if( this.allOk )
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
            this.lg$.log("---- phone: " + this.bkng$.phone);
            this.router.navigate(['/booking-stage5']);
        }

    }

    private checkStringField( form, service ) : ValidValue
	{
		this.lg$.log("----> checkStringField(" + name + ", " + service + ")");
        let result: ValidValue;

        // A form value takes precenence as the user just typed it in
        // so if present, use 
		
		if ( ( form !== undefined ) && ( form !== '' ) )
		{
			if( /^\w+/.test(form) )
            {
                result = ValidValue.FORM;
            }
            else
            {
                result = ValidValue.NONE;
            }
		} else if ( ( service !== undefined ) && ( service !== '' ) )
		{
                result = ValidValue.SERVICE;
		}

        return result;
	}


    private checkFName( formName, serviceName ) : boolean
	{
		this.lg$.log("----> checkFName(" + name + ", " + serviceName + ")");
        let result: ValidValue;
        let allOk = true;

        result = this.checkStringField( formName, serviceName );

        switch( result )
        {
            case ValidValue.FORM:
                this.bkng$.firstname = formName;
                this.lg$.log("----> checkFName(): using firstname from form");
                break;
            case ValidValue.SERVICE:
                this.lg$.log("----> checkFName(): using firstname from service");
                break;
            case ValidValue.NONE:
                this.lg$.log("----> checkFName(" + name + ", " + this.bkng$.firstname +  ") undefined or blank!");
                allOk = false;
                break;
            default:
                allOk = false;
                break;
        }

        return allOk;
	}

    private checkSName( formName, serviceName ) : boolean
	{
		this.lg$.log("----> checkSName(" + name + ")");
		let result: ValidValue;
        let allOk = true;

        // A form value takes precenence as the user just typed it in
        // so if present, use 
		
		if ( ( formName !== undefined ) && ( formName !== '' ) )
		{
			if( /^\w+/.test(formName) )
            {
                result = ValidValue.FORM;
            }
            else
            {
                result = ValidValue.NONE;
            }
		} else if ( ( serviceName !== undefined ) && ( serviceName !== '' ) )
		{
                result = ValidValue.SERVICE;
		}

        switch( result )
        {
            case ValidValue.FORM:
                this.bkng$.surname = formName;
                this.lg$.log("----> checkSName(): using firstname from form");
                break;
            case ValidValue.SERVICE:
                this.lg$.log("----> checkSName(): using firstname from service");
                break;
            case ValidValue.NONE:
                this.lg$.log("----> checkSName(" + name + ", " + this.bkng$.firstname +  ") undefined or blank!");
                allOk = false;
                break;
            default:
                allOk = false;
                break;
        }

        return allOk;
	}

	
	private checkEmail( formEmail, serviceEmail ) : boolean
	{
		this.lg$.log("----> checkEmail(" + formEmail + ", " + serviceEmail + ")");
        let result: ValidValue;
        let allOk = true;

        // A form value takes precenence as the user just typed it in
        // so if present, use 
		
		if ( ( formEmail !== undefined ) && ( formEmail !== '' ) )
		{
			if( /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(formEmail) )
            {
                result = ValidValue.FORM;
            }
            else
            {
                result = ValidValue.NONE;
            }
		} else if ( ( serviceEmail !== undefined ) && ( serviceEmail !== '' ) )
		{
                result = ValidValue.SERVICE;
		}

        switch( result )
        {
            case ValidValue.FORM:
                this.bkng$.email = formEmail;
                this.lg$.log("----> checkFName(): using email from form");
                break;
            case ValidValue.SERVICE:
                this.lg$.log("----> checkFName(): using email from service");
                break;
            case ValidValue.NONE:
                this.lg$.log("----> checkFName(" + formEmail + ", " + this.bkng$.email +  ") undefined or blank!");
                allOk = false;
                break;
            default:
                allOk = false;
                break;
        }

        return allOk;
	}

	
	private checkPh( formPhone, servicePhone ) : boolean
	{
		this.lg$.log("----> checkPh(" + formPhone + ", " + servicePhone + ")");
		this.lg$.log("== " + /^\d{10}$/.test(formPhone) );
		this.lg$.log("== " + /^\+\d{12}$/.test(formPhone) );

        let result: ValidValue;
        let allOk = true;

        // A form value takes precenence as the user just typed it in
        // so if present, use 
		
		if ( ( formPhone !== undefined ) && ( formPhone !== '' ) )
		{
			/*if ( (/^\d{10}$/.test(phone)) || (/^\+\d{12}$/.test(phone)) )
			{
				return true;
			} else
			{
				return false;
			}*/
			
			// Removing checks, once it is entered we'll take it
			result = ValidValue.FORM;
		} else if ( ( servicePhone !== undefined ) && ( servicePhone !== '' ) )
		{
                result = ValidValue.SERVICE;
		}

        switch( result )
        {
            case ValidValue.FORM:
                this.bkng$.phone = formPhone;
                this.lg$.log("----> checkPh(): using phone from form");
                break;
            case ValidValue.SERVICE:
                this.lg$.log("----> checkPh(): using phone from service");
                break;
            case ValidValue.NONE:
                this.lg$.log("----> checkPh(" + formPhone + ", " + this.bkng$.phone +  ") undefined or blank!");
                allOk = false;
                break;
            default:
                allOk = false;
                break;
        }

        return allOk;
	}

    private checkCarReg( formReg, serviceReg ) : boolean
	{
		this.lg$.log("----> checkFName(" + formReg + ", " + serviceReg + ")");
        let result: ValidValue;
        let allOk = true;

        // A form value takes precenence as the user just typed it in
        // so if present, use 
		
		if ( ( formReg !== undefined ) && ( formReg !== '' ) )
		{
            // No checks here
                result = ValidValue.FORM;

		} else if ( ( serviceReg !== undefined ) && ( serviceReg !== '' ) )
		{
                result = ValidValue.SERVICE;
		}

        switch( result )
        {
            case ValidValue.FORM:
                this.bkng$.vehicalReg = formReg;
                this.lg$.log("----> checkCarReg(): using firstname from form");
                break;
            case ValidValue.SERVICE:
                this.lg$.log("----> checkCarReg(): using firstname from service");
                break;
            case ValidValue.NONE:
                this.lg$.log("----> checkCarReg(" + formReg + ", " + this.bkng$.vehicalReg +  ") undefined or blank!");
                allOk = false;
                break;
            default:
                allOk = false;
                break;
        }

        return allOk;
	}

    private checkCountry( formCountry, serviceCountry ) : boolean
	{
		this.lg$.log("----> checkFName(" + formCountry + ", " + serviceCountry + ")");
        let result: ValidValue;
        let allOk = true;

        // A form value takes precenence as the user just typed it in
        // so if present, use 
		
		if ( ( formCountry !== undefined ) && ( formCountry !== '' ) )
		{
            // No checks here
                result = ValidValue.FORM;

		} else if ( ( serviceCountry !== undefined ) && ( serviceCountry !== '' ) )
		{
                result = ValidValue.SERVICE;
		}

        switch( result )
        {
            case ValidValue.FORM:
                this.bkng$.country = formCountry;
                this.lg$.log("----> checkCarReg(): using firstname from form");
                break;
            case ValidValue.SERVICE:
                this.lg$.log("----> checkCarReg(): using firstname from service");
                break;
            case ValidValue.NONE:
                this.lg$.log("----> checkCarReg(" + formCountry + ", " + this.bkng$.country +  ") undefined or blank!");
                allOk = false;
                break;
            default:
                allOk = false;
                break;
        }

        return allOk;
	}
		
	
	private showFNError() {
    	this.lg$.log("----> showFNError()");
        this.err$.openAlert('You must enter a valid first name!');
    }
	
	private showsSNError() {
    	this.lg$.log("----> showSNError()");
        this.err$.openAlert('You must enter a valid surname!');
    }
	
	private showEmailError() {
    	this.lg$.log("----> showEmailError()");
        this.err$.openAlert('You must enter a valid email address!');
    }
	
	private showPhError() {
    	this.lg$.log("----> showPhError()");
        this.err$.openAlert('You must enter a valid phone number!');
    }
}