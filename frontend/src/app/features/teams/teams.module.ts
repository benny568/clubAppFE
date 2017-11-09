import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { ViewTeamComponent } from './view-team/view-team.component';
import { LeagueRepublicTable } from './lr-table/lr-table.component';
import { LeagueRepublicResults } from './lr-results/lr-results.component';
import { FarViewComponent } from './far-view/far-view.component';

@NgModule({
  imports: [
    CommonModule,
    TeamsRoutingModule
  ],
  declarations: [
                  ViewTeamComponent, 
                  LeagueRepublicTable, 
                  LeagueRepublicResults, FarViewComponent
                ]
})
export class TeamsModule { }
