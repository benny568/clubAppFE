import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivateComponent } from './private.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminTutorialsComponent } from './admin-tutorials/admin-tutorials.component';
import { AdminMembersComponent } from './admin-members/admin-members.component';

const routes: Routes = [
  { path: '', component: PrivateComponent },
  { path: 'adminhome', component: AdminHomeComponent },
  { path: 'adminOverview', component: AdminOverviewComponent },
  { path: 'adminTutorials', component: AdminTutorialsComponent },
  { path: 'adminMembers', component: AdminMembersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
