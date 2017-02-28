import { Component }      from '@angular/core';
import { Router }         from '@angular/router';

import { LoggerService }  from '../services/logger.service';
import { BookingService } from './booking.service';
import { ErrorService }    from '../services/error.service';

@Component({
    templateUrl: './html/fleadhHome.component.html',
    styleUrls: ['./css/fleadhHome.component.css']
})

export class FleadhHomeComponent {
    tandc: boolean;
    step1enabled: boolean;
    step2enabled: boolean;
    step3enabled: boolean;
    step4enabled: boolean;

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
        this.lg$.log(this.tandc);
        if( !this.tandc )
        {
            this.showTnCError();
        }
        else
        {
            this.bkng$.tandc = this.tandc === true ? 1 : 0;
            this.router.navigate(['/booking-stage2']);
        }
    }

    private showTnCError() {
    	this.lg$.log("----> showTnCError()");
        this.err$.openAlert('You must accept the Terms & Conditions to proceed!');
    }
}