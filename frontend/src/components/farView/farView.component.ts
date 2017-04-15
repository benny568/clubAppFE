/**
 * Created by odalybr on 07/04/2016.
 */
import { Component }              from '@angular/core';

import { SessionDataService }     from '../../services/session-data.service';
import { LoggerService }          from '../../services/logger.service';
import { LeagueRepublicResults }  from '../lrResults/leagueRepublicResults.component';

@Component({
  templateUrl: './farView.component.html',
  styleUrls: ['./farView.component.css' ]
})

export class FarViewComponent {
    componentName:string = 'FarViewComponent';
	logdepth:number = 2;

    constructor(private lg$: LoggerService, public d$: SessionDataService) { }

	ngOnInit()
	{
		this.lg$.setLogHdr(this.logdepth, this.componentName);
	}

}
