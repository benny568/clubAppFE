import { Component }       from '@angular/core';

import { BookingService }  from '../../services/booking.service';

@Component({
	selector: 'departure-datepicker',
	template: `	

			<p-calendar [(ngModel)]="bkng$.departureDate" 
						dateFormat="dd/mm/yy"
						placeholder="Please pick departure date"
						showIcon="true" >
			</p-calendar>

			`
})


export class DepartureDatepickerComponent {

	constructor( public bkng$: BookingService ) { console.log("==> DepartureDatepickerComponent..."); }
	
}