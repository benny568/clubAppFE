import { Component, OnInit } from '@angular/core';

import { SessionDataService }   from '../../../services/session-data.service';
import { LoggerService }        from '../../../services/logger.service';
import { NewsService }          from '../../../services/news.service';


@Component({
  selector: 'app-academy-news',
  templateUrl: './academy-news.component.html',
  styleUrls: ['./academy-news.component.css'],
  providers: [ LoggerService ]
})

export class AcademyNewsComponent {
	componentName:string = 'AcademyNewsComponent';
	logdepth:number = 1;

    constructor( public news$: NewsService, private lg$: LoggerService ) {}

    ngOnInit() {
        this.lg$.setLogHdr(this.logdepth, this.componentName);
        this.news$.loadNewsStories('A' )
          .subscribe(
		            	data => this.news$.setNews(data),
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
