import { Component,
         OnInit }          from '@angular/core';
import { Router }          from '@angular/router';
import { FormGroup, 
		     FormControl, 
		     Validators, 
		     FormBuilder }     from '@angular/forms';

import { LoggerService }   from '../../../../services/logger.service';
import { CommonService }   from '../../../../services/common.service';
import { ErrorService }    from '../../../../services/error.service';
import { AcademyRegistrationService }  from '../academy-registration.service';

@Component({
  selector: 'app-academy-registration-form',
  templateUrl: './academy-registration-form.component.html',
  styleUrls: ['./academy-registration-form.component.css']
})

export class AcademyRegistrationFormComponent implements OnInit {
	componentName:string = 'AcademyRegistrationComponent';
	logdepth:number = 4;
	step1enabled: boolean = false;
	step2enabled: boolean = true;
	step3enabled: boolean = false;
	regForm: any;
	error: boolean;
	/* Set the initial date for the date picker calander */
	year = "2017";
	today = new Date();
	startDate = this.today.getDate();
	/* ************************************************* */


	constructor( private lg$: LoggerService,
			         private com$: CommonService,
				       private err$: ErrorService,
			         private ar$: AcademyRegistrationService,
			         private router: Router,
				       fb: FormBuilder )
	{

		this.regForm = fb.group({
			firstname: [''],
			lastname: [''],
			dob: [''],
			allergies: [''],
			medication: [''],
			notes: [''],
			asthma: [''],
			diabetes: [''],
			fathername: [''],
			mothername: [''],
			address: [''],
			email: [''],
			phone1: [''],
			phone2: [''],
			consent: [''],
			photoconsent: [''],
			singleTerm: [''],
			secondChild: ['']
		});

		/*this.regForm = fb.group({
			firstname: ['John'],
			lastname: ['Black'],
			dob: ['11/09/99'],
			allergies: ['No allergies'],
			medication: ['Paracetomol'],
			notes: ['There are no notes.'],
			asthma: ['true'],
			diabetes: ['false'],
			fathername: ['Tom'],
			mothername: ['Mary'],
			address: ['23 Woodland Grove'],
			email: ['tb@hotmail.com'],
			phone1: ['12345678990'],
			phone2: ['0987654322'],
			consent: ['true'],
			photoconsent: ['true']
		});*/

		this.error = false;
	}

	ngOnInit() {
    	this.lg$.setLogHdr(this.logdepth, this.componentName);
      this.lg$.log("ngOnInit()");
	}

	submit(form: any)
	{
		var today = new Date();
		this.ar$.setFieldValue( 'Registration Date', today.toDateString() );

		// Fill in the service structure for further processing
		if( !form.consent === true )
		{
			this.showConsenterror();
		}
		else if( form.firstname === '')
		{
			this.showFNError();
		}
		else if( form.lastname === '' )
		{
			this.showsSNError();
		}
		else if( form.dob === '' )
		{
			this.showDOBError();
		}
		else if( form.email === '' )
		{
			this.showEmailError();
		}
		else if (form.medication === '' )
		{
			this.showMedicationError();
		}
		else if( form.fathername === '' )
		{
			this.showDadError();
		}
		else if( form.mothername === '' )
		{
			this.showMomError();
		}
		else if( form.address === '' )
		{
			this.showAddressError();
		}
		else if( form.phone1 === '' )
		{
			this.showPhError();
		}
		else if( form.phone2 === '' )
		{
			this.showPhError();
		}
		else if( !form.photoconsent )
		{
			this.showConsenterror();
		}
		else
		{
			this.setServiceParameters(form);
			this.router.navigate(['/academyRegistrationPayment']);
		}
	}

	setServiceParameters( form: any )
	{
		this.ar$.setFieldValue('General Consent', form.consent);;
		this.ar$.setFieldValue('First name', form.firstname );
		this.ar$.setFieldValue('Last name', form.lastname);
		this.ar$.setFieldValue('Date of Birth', form.dob);
		this.ar$.setFieldValue('email', form.email);
		this.ar$.setFieldValue('Allergy information', form.allergies);
		this.ar$.setFieldValue('Medication', form.medication);
		this.ar$.setFieldValue('Notes', form.notes);
		this.ar$.setFieldValue('Asthma', form.asthma);
		this.ar$.setFieldValue('Diabetes', form.diabetes);
		this.ar$.setFieldValue('Father\'s name', form.fathername);
		this.ar$.setFieldValue('Mother\'s Name', form.mothername);
		this.ar$.setFieldValue('Address', form.address);
		this.ar$.setFieldValue('First contact number', form.phone1) ;
		this.ar$.setFieldValue('Second contact number', form.phone2);
		this.ar$.setFieldValue('Consent to take pictures', form.photoconsent);
		this.ar$.setFieldValue('Single Term', form.singleTerm);
		this.ar$.setFieldValue('Second Child', form.secondChild);
	}

	back()
	{
		this.lg$.log("-> back()");
		this.router.navigate(['/academyRegistration']);
	}

	showConsenterror() {
    	this.lg$.log("----> showConsenterror()");
        this.err$.openAlert('You must indicate your consent by ticking the box to continue.');
	}

    showFNError() {
    	this.lg$.log("----> showFNError()");
        this.err$.openAlert('You must enter a valid first name!');
    }

	showsSNError() {
    	this.lg$.log("----> showSNError()");
        this.err$.openAlert('You must enter a valid surname!');
    }

	showEmailError() {
    	this.lg$.log("----> showEmailError()");
        this.err$.openAlert('You must enter a valid email address!');
    }

	showPhError() {
    	this.lg$.log("----> showPhError()");
        this.err$.openAlert('You must enter a valid phone number!');
    }

	showDOBError() {
    	this.lg$.log("----> showDOBError()");
        this.err$.openAlert('You must enter a valid date of birth!');
    }

	showMomError() {
    	this.lg$.log("----> showMomError()");
        this.err$.openAlert('You must enter the child\'s Mother\'s name!');
    }
	showDadError()
	{
    	this.lg$.log("----> showDadError()");
        this.err$.openAlert('You must enter the child\'s Father\'s name!');
    }

	showInfoError()
	{
    	this.lg$.log("----> showInfoError()");
        this.err$.openAlert('Please enter any allergy information or state none if applicable.');
    }
	showAsthmaError()
	{
    	this.lg$.log("----> showInfoError()");
        this.err$.openAlert('Please idicate if your child has asthma.');
    }
	showDiabetesError()
	{
    	this.lg$.log("----> showInfoError()");
        this.err$.openAlert('Please idicate if your child has diabetes.');
    }
	showMedicationError()
	{
    	this.lg$.log("----> showInfoError()");
        this.err$.openAlert('Please list any medication your child may need during academy sessions.');
    }
	showAddressError()
	{
		this.lg$.log("----> showAddressError()");
		this.err$.openAlert('Please povide a valid mailing address.');
	}

}


