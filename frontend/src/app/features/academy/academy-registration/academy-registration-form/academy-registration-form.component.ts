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
  selector   : 'app-academy-registration-form',
  templateUrl: './academy-registration-form.component.html',
  styleUrls  : ['./academy-registration-form.component.css'],
  providers  : [ LoggerService ]
})

export class AcademyRegistrationFormComponent implements OnInit {
	componentName: string = 'AcademyRegistrationComponent';
	logdepth     : number = 4;
	step1enabled : boolean = false;
	step2enabled : boolean = true;
	step3enabled : boolean = false;
	regForm      : any;
	error        : boolean;
	/* Set the initial date for the date picker calander */
	year      = "2008";
	today     = new Date();
	startDate = this.today.getDate();
	/* ************************************************* */

	constructor( private lg$   : LoggerService,
			         private com$  : CommonService,
			         private err$  : ErrorService,
			         public  ar$   : AcademyRegistrationService,
			         private router: Router,
			                 fb    : FormBuilder )
	{
		this.lg$.setLogHdr(this.logdepth, this.componentName);
		this.lg$.log("** Reg Component constructor called.");

		this.regForm = new FormGroup({
			firstname   : new FormControl(),
			lastname    : new FormControl(),
			dob         : new FormControl(),
			allergies   : new FormControl(),
			medication  : new FormControl(),
			notes       : new FormControl(),
			asthma      : new FormControl(),
			diabetes    : new FormControl(),
			fathername  : new FormControl(),
			mothername  : new FormControl(),
			address     : new FormControl(),
			email       : new FormControl(),
			phone1      : new FormControl(),
			phone2      : new FormControl(),
			consent     : new FormControl(),
			photoconsent: new FormControl(),
			singleTerm  : new FormControl(),
			secondChild : new FormControl()
		});

		this.error = false;
	}

	ngOnInit() {
	  this.lg$.log("ngOnInit()");
	}

	submit(form: any)
	{
		var today = new Date();
		this.ar$.regData.setRegdate( today.toDateString() );

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
			this.lg$.log("Logging parmeters entered...");
			this.setServiceParameters(form);
			this.router.navigate(['/academyRegistrationPayment']);
		}
	}

	setServiceParameters( form: any )
	{
		this.ar$.regData.setGeneralconsent(form.consent);
		this.ar$.regData.setFirstname(form.firstname );
		this.ar$.regData.setLastname(form.lastname);
		this.ar$.regData.setDob(form.dob);
		this.ar$.regData.setEmail(form.email);
		this.ar$.regData.setAllergies(form.allergies);
		this.ar$.regData.setMedication(form.medication);
		this.ar$.regData.setNotes(form.notes);
		this.ar$.regData.setAsthma(form.asthma);
		this.ar$.regData.setDiabetes(form.diabetes);
		this.ar$.regData.setFatherName(form.fathername);
		this.ar$.regData.setMotherName(form.mothername);
		this.ar$.regData.setAddress(form.address);
		this.ar$.regData.setPhone1(form.phone1) ;
		this.ar$.regData.setPhone2(form.phone2);
		this.ar$.regData.setPictureconsent(form.photoconsent);
		this.ar$.regData.setHalfterm(form.singleTerm);
		this.ar$.regData.setSecondchild(form.secondChild);

		this.printServiceParameters();
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

	printServiceParameters()
	{
    this.lg$.trace("->printServiceParameters()");
		this.lg$.trace(this.ar$.regData.getGeneralconsent()==null?'':this.ar$.regData.getGeneralconsent());
		this.lg$.trace( this.ar$.regData.getFirstname());
    this.lg$.trace( this.ar$.regData.getLastname());
    this.lg$.trace( this.ar$.regData.getAddress());
		this.lg$.trace( this.ar$.regData.getDob());
		this.lg$.trace( this.ar$.regData.getEmail());
		this.lg$.trace( this.ar$.regData.getAllergies());
		this.lg$.trace( this.ar$.regData.getMedication());
		this.lg$.trace( this.ar$.regData.getNotes());
		this.lg$.trace( this.ar$.regData.getAsthma());
		this.lg$.trace( this.ar$.regData.getDiabetes());
		this.lg$.trace( this.ar$.regData.getFatherName());
		this.lg$.trace( this.ar$.regData.getMotherName());
		this.lg$.trace( this.ar$.regData.getAddress());
		this.lg$.trace( this.ar$.regData.getPhone1());
		this.lg$.trace( this.ar$.regData.getPhone2());
		this.lg$.trace( this.ar$.regData.getPictureconsent());
		this.lg$.trace( this.ar$.regData.getHalfterm());
    this.lg$.trace( this.ar$.regData.getSecondchild());
    this.lg$.trace("<-printServiceParameters()");
	}

}


