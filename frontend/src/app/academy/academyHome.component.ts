/**
 * Created by odalybr on 08/04/2016.
 */
import { Component }            from '@angular/core';

import { SessionDataService }   from "../services/session-data.service";
import { LoggerService }        from "../services/logger.service";
import { NewsComponent }        from "../news/news.component";

@Component({
  templateUrl: './html/academyHome.component.html',
  styleUrls: [ './css/academyHome.component.css' ]
})

export class AcademyHomeComponent {
	componentName:string = 'AcademyHomeComponent';
	logdepth:number = 1;

    constructor( private d$: SessionDataService, private lg$: LoggerService ) {}

    ngOnInit() {
        this.lg$.setLogHdr(this.logdepth, this.componentName);
        this.d$.loadNewsStories()
          .subscribe(
		            	data => this.d$.setNews(data),
		            	error => this.lg$.error("===> Error getting news from server: " + error),
		            	() => this.lg$.log(" <=== Received news from server. <====")
		            );
    }

    goToAcademyHome() {
    	this.lg$.log("-- going home..");
    }

    goToAcademyOverview() {
    	this.lg$.log("-- going to overview..");
    }

    goToAcademyCoaches() {
    	this.lg$.log("-- going to coaches..");
    }

    goToAcademySchedule() {
    	this.lg$.log("-- going to schedule..");
    }

    goToAcademyRegistration() {
    	this.lg$.log("-- going to registration..");
    }

    goToAcademyPhotos() {
    	this.lg$.log("-- going to photos..");
    }

}
