import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivateComponent } from './private.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { AdminTutorialsComponent } from './admin-tutorials/admin-tutorials.component';
import { AdminMembersComponent } from './admin-members/admin-members.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminAllMembersComponent } from './admin-all-members/admin-all-members.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { PaidMembersReportComponent } from './paid-members-report/paid-members-report.component';
import { PaymentsDueReportComponent } from './payments-due-report/payments-due-report.component';

const routes: Routes = [
  { path: '', component: PrivateComponent },
  { path: 'adminHome', component: AdminHomeComponent },
  { path: 'adminOverview', component: AdminOverviewComponent },
  { path: 'adminTutorials', component: AdminTutorialsComponent },
  { path: 'adminMembers', component: AdminMembersComponent },
  { path: 'adminAllMembers', component: AdminAllMembersComponent },
  { path: 'adminUsers', component: AdminUsersComponent },
  { path: 'adminReports', component: AdminReportsComponent },
  { path: 'paidMembersReport', component: PaidMembersReportComponent },
  { path: 'paymentsDueReport', component: PaymentsDueReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
