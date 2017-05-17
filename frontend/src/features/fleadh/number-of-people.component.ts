import { Component }       from '@angular/core';

import { BookingService }  from '../../services/booking.service';


@Component({
	selector: 'number-of-people',
	template: `

			<p-spinner size="2" 
			           [(ngModel)]="bkng$.numberOfPeople" 
			           [min]="1" 
			           [max]="16" >
			</p-spinner>

			`
})


export class NumberOfPeopleComponent {

	constructor( public bkng$: BookingService ) { console.log("==> NumberOfPeopleComponent..."); }
	
}