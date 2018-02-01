import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivateComponent } from './private.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

const routes: Routes = [
  { path: '', component: PrivateComponent },
  { path: 'adminhome', component: AdminHomeComponent },
  { path: 'adminOverview', component: AdminOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
