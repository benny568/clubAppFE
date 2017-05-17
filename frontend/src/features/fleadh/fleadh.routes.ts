import { Routes, RouterModule } from '@angular/router';
import { FleadhHomeComponent }  from './fleadhHome.component';
import { BookingStage2Component } from './booking-stage2.component';
import { BookingStage3Component } from './booking-stage3.component';
import { BookingStage4Component } from './booking-stage4.component';


export const fleadhRoutes: Routes = [
    { path: 'fleadh', component: FleadhHomeComponent },
    { path: 'booking-stage2', component: BookingStage2Component },
    { path: 'booking-stage3', component: BookingStage3Component },
    { path: 'booking-stage4', component: BookingStage4Component }
];