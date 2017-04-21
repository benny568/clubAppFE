import { Component }           from '@angular/core';

import { SessionDataService }  from '../../services/session-data.service';
import { LoggerService }       from '../../services/logger.service';
/*import { LeagueRepublicTable } from "./leagueRepublicTable.component";*/

@Component({
  template: require('./viewTeam.component.html'),
  styles: [ require('./viewTeam.component.css').toString() ]
})

export class ViewTeamComponent {
	teamName:string;
	componentName:string = 'ViewTeam';
	logdepth:number = 2;

    constructor(private lg$: LoggerService, public d$: SessionDataService) { }

	ngOnInit()
	{
		this.lg$.setLogHdr(this.logdepth, this.componentName);
	}
}
