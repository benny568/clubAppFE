/**
 * Created by odalybr on 07/04/2016.
 */
import { Component }              from '@angular/core';

import { SessionDataService }     from '../../services/session-data.service';
import { LoggerService }          from '../../services/logger.service';
import { LeagueRepublicResults }  from '../lrResults/leagueRepublicResults.component';

@Component({
  template: require('./farView.component.html'),
  styles: [ require('./farView.component.css').toString() ]
})

export class FarViewComponent {
    componentName:string = 'FarViewComponent';
	logdepth:number = 2;

    constructor(private lg$: LoggerService, private d$: SessionDataService) { }

	ngOnInit()
	{
		this.lg$.setLogHdr(this.logdepth, this.componentName);
	}

}
