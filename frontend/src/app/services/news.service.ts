import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { CommonService } from './common.service';
import { NewsStory } from '../model/news-story';

@Injectable()
export class NewsService {
    NewsStories: Array<NewsStory>;

    constructor( private com$: CommonService, private http$: Http ) {
        this.NewsStories = new Array<NewsStory>();
    }

    /**********************************************************
     * Name       : loadNewsStories()
     * Description: Retrieves a list of Newws from the server
     * Scope      : Externally accessible
     * Params in  : None
     * Return     : Observable
     **********************************************************/
    public loadNewsStories( type?: string )
    {
        console.log('-->' + 'loadNewsStories()..');
        const url = this.com$.getHome();

        // If it's the Academy asking for news....
        if( type === 'A'){
          return this.http$.get( url + 'public/stories/A' )
            .map(response => response.json());
        }
        // Else...
        return this.http$.get( url + 'public/stories' )
            			.map(response => response.json());
     }

    /**********************************************************
     * Name       : setNews()
     * Description: Setter for array of news stories
     * Scope      : Externally accessible
     * Params in  : Array of news stories
     * Return     : None
     **********************************************************/
     public setNews( data: [NewsStory] )
    {
    	console.log('->' + 'setNews()...recieved news stories: ' + data);
    	this.NewsStories = data;

        /*if( process.env.NODE_ENV === 'development')
        {
            for( let i=0; i<this.NewsStories.length; i++ )
            {
                console.log("Image " + i + ": " + this.NewsStories[i].image);
            }
        }*/

        /*if (process.env.DEBUG) {
          console.log('Debugging output set');
        }*/
    }

}

