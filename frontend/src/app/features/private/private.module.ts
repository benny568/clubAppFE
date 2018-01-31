import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

@NgModule({
  imports: [
    CommonModule,
    PrivateRoutingModule
  ],
  providers: [
  ],
  declarations: [
    PrivateComponent, 
    AdminHomeComponent
  ]
})
export class PrivateModule { }
