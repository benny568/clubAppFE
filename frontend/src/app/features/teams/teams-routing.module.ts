import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewTeamComponent } from './view-team/view-team.component';
import { FarViewComponent } from './far-view/far-view.component';

const routes: Routes = [
  { path: 'viewTeam', component: ViewTeamComponent },
  { path: 'farView', component: FarViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
