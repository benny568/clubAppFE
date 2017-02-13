/**
 * Created by odalybr on 06/04/2016.
 */
import {Component} from '@angular/core';

import { Slide }              from '../slide/slide.component';
import { Carousel }           from '../carousel/carousel.component';
import { Sponsor }            from '../model/sponsor';
import { SessionDataService } from "../services/session-data.service";
import { LoggerService }      from '../services/logger.service';

@Component({
    selector: 'sponsors',
    templateUrl: './sponsors.component.html',
    styleUrls: [ './sponsors.component.css' ]
})

export class SponsorsComponent {
  sponsors:Array<Sponsor>;
  componentName = 'SponsorsComponent';
	logdepth:number = 2;

    constructor( private d$: SessionDataService, private lg$: LoggerService ) { }

    ngOnInit() {
    	this.lg$.setLogHdr(this.logdepth, this.componentName);
      this.lg$.log(" ngOnInit()");
      this.d$.loadCurrentSponsors();
    }
}
