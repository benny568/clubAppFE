import { Component, OnInit } from '@angular/core';

import { SessionDataService }     from '../../../services/session-data.service';
import { LoggerService }          from '../../../services/logger.service';
import { LeagueRepublicResults }  from '../lr-results/lr-results.component';

@Component({
  templateUrl: './far-view.component.html',
  styleUrls: ['./far-view.component.css']
})
export class FarViewComponent implements OnInit {

  componentName:string = 'FarViewComponent';
	logdepth:number = 2;

    constructor(private lg$: LoggerService, public d$: SessionDataService) { }

	ngOnInit()
	{
		this.lg$.setLogHdr(this.logdepth, this.componentName);
	}

}
