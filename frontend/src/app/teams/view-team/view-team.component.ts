import { Component, OnInit } from '@angular/core';

import { SessionDataService }  from '../../services/session-data.service';
import { LoggerService }       from '../../services/logger.service';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent implements OnInit {
	teamName:string;
	componentName:string = 'ViewTeam';
	logdepth:number = 2;

    constructor(private lg$: LoggerService, public d$: SessionDataService) { }

	ngOnInit()
	{
		this.lg$.setLogHdr(this.logdepth, this.componentName);
	}
}
