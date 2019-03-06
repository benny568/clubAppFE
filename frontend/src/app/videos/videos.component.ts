import { Component, OnInit }   from '@angular/core';
import { ActivatedRoute }      from '@angular/router';

import { Media } 				from '../model/media';
import { SessionDataService }   from '../services/session-data.service';
import { LoggerService }        from '../services/logger.service';
import { CommonService }        from '../services/common.service';

@Component({
  selector   : 'app-photos',
  templateUrl: './videos.component.html',
  styleUrls  : ['./videos.component.css'],
  providers  : [ LoggerService ]
})
export class VideosComponent implements OnInit {
	componentName   : string = 'VideosComponent';
	path            : string = '';
	logdepth        : number = 1;
	paramsObservable: any;
	display         : boolean;

	constructor( private lg$: LoggerService,
	             private com$ : CommonService,
	             public  d$   : SessionDataService,
	             private route: ActivatedRoute ) {
		this.lg$.setLogHdr(this.logdepth, this.componentName);

    	this.lg$.log( this.componentName + " - constructor()");

		this.display = true;
	}

	ngOnInit()
	{
		let cat1           = '';                  //this.routeParams.get('cat1'); // team
		let cat2           = '';                  //this.routeParams.get('cat2'); // year
		let cat3           = '';                  //this.routeParams.get('cat3'); // event
		var url            = '';
		    this.d$.aAlbum = new Array<Media>();

		this.lg$.log( this.componentName + " - ngOnInit()")

		this.paramsObservable = this.route.params.subscribe(params =>
		{
			cat1         = params['cat1'];
			cat2         = params['cat2'];
			cat3         = params['cat3'];
			this.display = false;


			this.lg$.log("-> parm change (" + cat1 + "/" + cat2 + "/" + cat3 + ")");

			if ( cat3 !== "none" && cat3 !== '' )
			{
				url       = this.com$.getHome() + 'public/videos/' + cat1 + '/' + cat2 + '/' + cat3;
				this.path = this.com$.getGalleryHome() + 'videos/' + cat1 + '/' + cat2 + '/' + cat3 + '/';
				this.lg$.log("Path set to: " + this.path);
			} else
			{
				url       = this.com$.getHome() + 'public/videos/' + cat1 + '/' + cat2;
				this.path = this.com$.getGalleryHome() + 'videos/' + cat1 + '/' + cat2 + '/';
				this.lg$.log("Path set to: " + this.path);
			}

			this.d$.loadVideoDetails(url)
				.subscribe(
		            	(data: [any]) => this.processResponse(data, this.path, this.d$.aAlbum),
		            	error         => console.log("===> Error getting list of videos from server."),
		            	()            => console.log( "<-" + " loadVideoDetails()")
		            );
		});

	}

	ngOnChanges()
	{
		this.lg$.log( this.componentName + " - ngOnChanges()");
	}


	processResponse( data: [any], path: string, album: Array<Media> )
	{
		this.lg$.log("-> processResponse()");
		this.lg$.log("     |- data:" + data);
		this.lg$.log("     |- path:" + path);
		this.lg$.log("     |- album:" + album);
		var self = this;

		this.com$.clearArray( album, this.lg$ );

		data.forEach(function(row){
			var photo : Media = new Media();
			    photo.image   = path + row;
			album.push(photo);
			self.lg$.log("         |- added image: " + photo.image );
		});

		this.lg$.trace("## Album contains: ");
		this.d$.printAlbum();

		self.display = true;
		this.lg$.log("<- processResponse()");
	}

	ngOnDestroy()
	{
    	this.paramsObservable.unsubscribe();
	}

}

