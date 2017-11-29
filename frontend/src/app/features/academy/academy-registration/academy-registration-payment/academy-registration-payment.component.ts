import { Component, OnInit } from '@angular/core';
import { Router }          from '@angular/router';

import { LoggerService }   from '../../../../services/logger.service';
import { AcademyRegistrationService }  from '../academy-registration.service';

@Component({
  selector: 'app-academy-registration-payment',
  templateUrl: './academy-registration-payment.component.html',
  styleUrls: ['./academy-registration-payment.component.css']
})
export class AcademyRegistrationPaymentComponent implements OnInit {
	componentName:string = 'AcademyRegistrationPaymentComponent';
	logdepth:number = 4;
	
  constructor( private lg$: LoggerService, 
               private ar$: AcademyRegistrationService, 
               private router: Router  
              ) {}
	
	ngOnInit() {
		this.lg$.setLogHdr(this.logdepth, this.componentName);
	    this.lg$.log("ngOnInit()");
	    
	    this.ar$.calculateTotalCost();
	    
	    this.ar$.logValues();
	}

	back()
	{
		this.lg$.log("-> back()");
		this.router.navigate(['/academyRegistration']);
	}
	
}
