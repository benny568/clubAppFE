import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './../../material.module';
import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { AdminTutorialsComponent } from './admin-tutorials/admin-tutorials.component';
import { AdminMembersComponent } from './admin-members/admin-members.component';
import { EditMemberComponent } from './edit-member/edit-member.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
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
    EditMemberComponent
  ],
  entryComponents: [
    EditMemberComponent
  ]
})
export class PrivateModule { }
