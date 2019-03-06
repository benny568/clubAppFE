import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './../../material.module';
import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { AdminTutorialsComponent } from './admin-tutorials/admin-tutorials.component';
import { AdminMembersComponent } from './admin-members/admin-members.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { DeleteMemberComponent } from './delete-member/delete-member.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AdminAllMembersComponent } from './admin-all-members/admin-all-members.component';

import { FilterMembersPipe } from '../../pipes/filter.pipe';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { PaidMembersReportComponent } from './paid-members-report/paid-members-report.component';
import { PaymentsDueReportComponent } from './payments-due-report/payments-due-report.component';
import { AdminMyProfileComponent } from './admin-my-profile/admin-my-profile.component';
import { EditMyProfileComponent } from './edit-my-profile/edit-my-profile.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PrivateRoutingModule,
    MaterialModule
  ],
  providers: [
  ],
  declarations: [
    PrivateComponent,
    AdminHomeComponent,
    AdminOverviewComponent,
    AdminTutorialsComponent,
    AdminMembersComponent,
    EditMemberComponent,
    AddMemberComponent,
    DeleteMemberComponent,
    AdminUsersComponent,
    AddUserComponent,
    UserDeleteComponent,
    UserEditComponent,
    AdminAllMembersComponent,
    FilterMembersPipe,
    AdminReportsComponent,
    PaidMembersReportComponent,
    PaymentsDueReportComponent,
    AdminMyProfileComponent,
    EditMyProfileComponent
  ],
  entryComponents: [
    AddMemberComponent,
    EditMemberComponent,
    DeleteMemberComponent,
    UserEditComponent,
    UserDeleteComponent,
    AddUserComponent,
    EditMyProfileComponent
  ]
})
export class PrivateModule { }
