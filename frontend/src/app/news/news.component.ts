import { Component } from '@angular/core';

import { LoggerService } from '../services/logger.service';
import { NewsService } from '../services/news.service';
import { NewsStory } from '../model/news-story';

@Component({
    selector   : 'news',
    templateUrl: './news.component.html',
    styleUrls  : ['./news.component.css'],
    providers  : [ LoggerService ]
})


export class NewsComponent {

    componentName = 'NewsComponent';
    logdepth      = 2;

    constructor( private lg$: LoggerService,
                 public news$: NewsService ) { }

    ngOnInit() {
    	this.lg$.setLogHdr(this.logdepth, this.componentName);
      var subscriber = this.news$.loadNewsStories();
      subscriber.subscribe(
                    (data: [NewsStory]) => this.news$.setNews(data),
                    error               => this.lg$.error("===> Error getting news from server: " + error),
                    ()                  => this.lg$.log(" <=== Received news from server. <====")
                  );
    }
}

