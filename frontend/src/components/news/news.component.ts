/**
 * Created by odalybr on 05/04/2016.
 */
import { Component }          from '@angular/core';

import { LoggerService }      from '../../services/logger.service';
import { NewsService }        from '../../services/news.service';

// The following imports are to make webpack include the files
// in the build/release.
import '../../assets/img/news/200clubwinner.jpg';
import '../../assets/img/news/and-the-winner-is.jpg';
import '../../assets/img/news/Fixtures.jpg';
import '../../assets/img/news/regnight.jpg';

@Component({
    selector: 'news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css']
})


export class NewsComponent {

    componentName = 'NewsComponent';
    logdepth = 2;

    constructor( private lg$: LoggerService,
                 public news$: NewsService ) { }

    ngOnInit() {
    	this.lg$.setLogHdr(this.logdepth, this.componentName);
        this.lg$.log("-> ngOnInit()");
        var subscriber = this.news$.loadNewsStories();
        subscriber.subscribe(
				            	data => this.news$.setNews(data),
				            	error => this.lg$.error("===> Error getting news from server: " + error),
				            	() => this.lg$.log(" <=== Received news from server. <====")
				            );
    }
}
