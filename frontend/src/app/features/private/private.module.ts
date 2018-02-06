import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { AdminTutorialsComponent } from './admin-tutorials/admin-tutorials.component';

@NgModule({
  imports: [
    CommonModule,
    PrivateRoutingModule
  ],
  providers: [
  ],
  declarations: [
    PrivateComponent, 
    AdminHomeComponent, AdminOverviewComponent, AdminTutorialsComponent
  ]
})
export class PrivateModule { }
