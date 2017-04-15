import { Component }       from '@angular/core';

import { BookingService }  from '../../services/booking.service';

@Component({
	selector: 'arrival-datepicker',
	template: `

			<p-calendar [(ngModel)]="bkng$.arrivalDate" 
						dateFormat="dd/mm/yy"
						placeholder="Please pick arrival date"
						showIcon="true"
						>
			</p-calendar>

			`
})


export class ArrivalDatepickerComponent {

	constructor( public bkng$: BookingService ) { console.log("==> ArrivalDatepickerComponent..."); }
	
}