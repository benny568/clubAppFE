import { Component }       from '@angular/core';

import { BookingService }  from '../../services/booking.service';

@Component({
	selector: 'arrival-datepicker',
	template: `

			<p-calendar [(ngModel)]="bkng$.arrivalDate" 
						dateFormat="dd/mm/yy"
						placeholder="Please pick arrival date"
						showIcon="true"
						[minDate]="minDate" [maxDate]="maxDate"
						>
			</p-calendar>

			`
})


export class ArrivalDatepickerComponent {
	minDate: Date;    
    maxDate: Date;

	constructor( public bkng$: BookingService ) { console.log("==> ArrivalDatepickerComponent..."); }

	ngOnInit()
	{
		let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        this.minDate = new Date();
		this.minDate.setDate(16);
        this.minDate.setMonth(7);
        this.minDate.setFullYear(year);
        this.maxDate = new Date();
		this.maxDate.setDate(22);
        this.maxDate.setMonth(7);
        this.maxDate.setFullYear(year)
	}
	
}