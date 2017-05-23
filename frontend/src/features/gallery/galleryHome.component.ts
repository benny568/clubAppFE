import { Component }            from '@angular/core';

import { SessionDataService }   from '../../services/session-data.service';
import { LoggerService }        from '../../services/logger.service';

// The following imports are to make webpack include the files
// in the build/release.
//import '../../assets/img/academy/flag.gif';


@Component({
  templateUrl: './html/galleryHome.component.html',
  styleUrls: [ './css/galleryHome.component.css' ]
})

export class GalleryHomeComponent {
	componentName:string = 'GalleryHomeComponent';
	logdepth:number = 2;

    constructor( private lg$: LoggerService ) {}

    ngOnInit() {
        this.lg$.setLogHdr(this.logdepth, this.componentName);
    }

}
