import { Component }      from '@angular/core';
import { Router }         from '@angular/router';

import { StepState, TdMediaService } from '@covalent/core';

import { LoggerService }  from '../services/logger.service';
import { ErrorService }  from '../services/error.service';

@Component({
	templateUrl: './html/academyTandC.component.html',		
	styles: ['./css/academyTandC.component.css']
})

export class AcademyTandCComponent {
	
	componentName:string = 'AcademyTandCComponent';
	logdepth:number = 3;
	//msgs: Message[] = [];
	tandc = false;
	value: boolean;
	active: boolean = false;
    step1enabled: boolean = true;
	step2enabled: boolean = false;
	step3enabled: boolean = false;
    state: StepState = StepState.Required; // or state: string = "required";
	
	constructor( private lg$: LoggerService, private router: Router, private err$: ErrorService  ) {}
	
	ngOnInit() {
    	this.lg$.setLogHdr(this.logdepth, this.componentName);
        this.lg$.log("ngOnInit()");
	}
	
	submit()
	{
		this.lg$.log( "tandc: " + this.tandc );
		
		if ( this.tandc !== true )
		{
			this.showTaCerror();
		} else
		{
			this.router.navigate(['/academyRegistration']);
		}
	}
	
	back()
	{
		this.lg$.log("-> back()");
		this.router.navigate(['']);
	}
	
	showTaCerror() {
    	this.lg$.log("----> showTaCerror()");
		this.err$.openAlert('You must accept the terms and conditions to continue');
    }
}