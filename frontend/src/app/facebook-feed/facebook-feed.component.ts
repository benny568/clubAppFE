import { Component, OnInit }   from '@angular/core';
import { ActivatedRoute }      from '@angular/router';

import { LoggerService }        from '../services/logger.service';
import { CommonService }        from '../services/common.service';

@Component({
  selector   : 'facebook-feed',
  templateUrl: './facebook-feed.component.html',
  styleUrls  : ['./facebook-feed.component.css'],
  providers  : [ LoggerService ]
})
export class FacebookFeedComponent implements OnInit {
	componentName   : string = 'FacebookFeedComponent';
	logdepth        : number = 1;

	constructor( private lg$ : LoggerService,
	             private com$: CommonService ) {
		this.lg$.setLogHdr(this.logdepth, this.componentName);

    	this.lg$.log("FacebookFeedComponent - constructor()");
	}

	ngOnInit()
	{
	
	}

}

