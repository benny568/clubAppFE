/**
 * Created by odalybr on 06/04/2016.
 */
import {Component} from '@angular/core';

import { Slide }              from '../slide/slide.component';
import { Carousel }           from '../carousel/carousel.component';
import { Sponsor }            from '../../model/sponsor';
import { SessionDataService } from "../../services/session-data.service";
import { LoggerService }      from '../../services/logger.service';

@Component({
    selector: 'sponsors',
    templateUrl: './sponsors.component.html',
    styleUrls: ['./sponsors.component.css']
})

export class SponsorsComponent {
  Sponsors:Array<Sponsor>;
  componentName = 'SponsorsComponent';
	logdepth:number = 2;

    constructor( private d$: SessionDataService, private lg$: LoggerService ) { }

    ngOnInit() {
    	this.lg$.setLogHdr(this.logdepth, this.componentName);
      this.lg$.log(" ngOnInit()");
      this.loadCurrentSponsors();
    }

    /**********************************************************
     * Name:		loadCurrentSponsors()
     * Description:	Load the current sponsors details
     * Scope:		Externally accessible
     * Params in:	None
     * Return:      Array of sponsor objects
     **********************************************************/
    loadCurrentSponsors() : Array<Sponsor>
    {
        console.log('-->' + 'loadCurrentSponsors()');

        this.Sponsors = [ {name:"Enzo's Takeaway", image: "../../assets/img/adverts/enzos.png" },
                            {name:"Rochford's Pharmacy", image: "../../assets/img/adverts/main-sponsor.png"},
                            {name:"Ennis Cabs", image: "../../assets/img/adverts/ec.png"},
                            {name:"Cahill Taxation Services", image: "../../assets/img/adverts/CTS-logo.png"}
                        ];

        /*this.Sponsors = [ {name:"Enzo's Takeaway", image:"../../assets/img/adverts/enzos.png"},
                            {name:"Rochford's Pharmacy", image: "../../assets/img/adverts/main-sponsor.png"},
                            {name:"Ennis Cabs", image: "../../assets/img/adverts/ec.png"},
                            {name:"Cahill Taxation Services", image: "../../assets/img/adverts/CTS-logo.png"}
                        ];*/
        return this.Sponsors;
    }
}
