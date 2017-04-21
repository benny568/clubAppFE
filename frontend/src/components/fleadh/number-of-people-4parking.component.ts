import { Component }       from '@angular/core';

import { Spinner }        from 'primeng/primeng';

import { BookingService } from '../../services/booking.service';


@Component({
	selector: 'number-of-people-4parking',
	template: `

			<p-spinner size="2" 
			           [(ngModel)]="bkng$.parking" 
			           [min]="0" 
			           [max]="2" >
			</p-spinner>

			`
})


export class NumberOfPeople4ParkingComponent {
	componentName:string = 'NumberOfPeople4ParkingComponent';
	logdepth:number = 4;

	constructor( private bkng$: BookingService ) { }
	
}