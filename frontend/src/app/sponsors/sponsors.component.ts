import {Component} from '@angular/core';

import { Sponsor }            from '../model/sponsor';
import { SessionDataService } from '../services/session-data.service';
import { LoggerService }      from '../services/logger.service';

@Component({
    selector   : 'sponsors',
    templateUrl: './sponsors.component.html',
    styleUrls  : ['./sponsors.component.css'],
    providers  : [ LoggerService ]
})

export class SponsorsComponent {
  Sponsors: Array<Sponsor>;
                                                        componentName = 'SponsorsComponent';
                                               logdepth:number        = 2;

    constructor( private d$: SessionDataService, private lg$: LoggerService ) { }

    ngOnInit() {
    	this.lg$.setLogHdr(this.logdepth, this.componentName);
      this.lg$.log(" ngOnInit()");
      this.loadCurrentSponsors();
    }

    /**********************************************************
     * Name       : loadCurrentSponsors()
     * Description: Load the current sponsors details
     * Scope      : Externally accessible
     * Params in  : None
     * Return     : Array of sponsor objects
     **********************************************************/
    loadCurrentSponsors(): Array<Sponsor>
    {
        console.log('-->' + 'loadCurrentSponsors()');

        this.Sponsors = [ {name:"Rochford's Pharmacy", image: "./assets/img/adverts/main-sponsor.png"},
                          {name:"RehabWorks, Harmony Row, Ennis", image: "./assets/img/adverts/rehabworks.png"},
                          {name:"Lets Bounce, Ruan, Ennis", image: "./assets/img/adverts/LetsBounce.png"}
                        ];

        return this.Sponsors;
    }
}

