import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivateComponent } from './private.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { AdminTutorialsComponent } from './admin-tutorials/admin-tutorials.component';
import { AdminMembersComponent } from './admin-members/admin-members.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminAllMembersComponent } from './admin-all-members/admin-all-members.component';

const routes: Routes = [
  { path: '', component: PrivateComponent },
  { path: 'adminHome', component: AdminHomeComponent },
  { path: 'adminOverview', component: AdminOverviewComponent },
  { path: 'adminTutorials', component: AdminTutorialsComponent },
  { path: 'adminMembers', component: AdminMembersComponent },
  { path: 'adminAllMembers', component: AdminAllMembersComponent },
  { path: 'adminUsers', component: AdminUsersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
