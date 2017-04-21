/**
 * Created by odalybr on 05/04/2016.
 */
import { Component }          from '@angular/core';

import { Slide }              from '../slide/slide.component';
import { Carousel }           from '../carousel/carousel.component';

import { LoggerService }      from '../../services/logger.service';
import { NewsService }        from '../../services/news.service';

/* Read in the standard news images so the'll be included in the relase by webpack */
import '../../assets/img/news/200clubwinner.jpg';
import '../../assets/img/news/and-the-winner-is.jpg';
import '../../assets/img/news/Fixtures.jpg';

@Component({
    selector: 'news',
    template: require('./news.component.html'),
    styles: [ require('./news.component.css').toString() ]
})


export class NewsComponent {

    componentName = 'NewsComponent';
    logdepth = 2;

    constructor( private lg$: LoggerService,
                 private news$: NewsService ) { }

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
