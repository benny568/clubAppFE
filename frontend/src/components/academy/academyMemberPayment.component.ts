import { Component }       from '@angular/core';
import { Router }          from '@angular/router';

import { LoggerService }   from '../../services/logger.service';
import { BookingService }  from '../../services/booking.service';
import { AcademyRegistrationService }  from './academyRegistration.service';

@Component({
	template: require('./html/academyMemberPayment.component.html'),
	styles: [ require('./css/academyMemberPayment.component.css').toString() ]
})

export class AcademyMemberPaymentComponent {
	componentName:string = 'AcademyMemberPaymentComponent';
	logdepth:number = 4;
	step1enabled: boolean = false;
	step2enabled: boolean = false;
	step3enabled: boolean = true;
	
	constructor( private lg$: LoggerService, private ar$: AcademyRegistrationService, private router: Router  ) {}
	
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