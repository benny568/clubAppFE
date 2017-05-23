import { Component }            from '@angular/core';

import { Slide }              from '../../components/slide/slide.component';
import { Carousel }           from '../../components/carousel/carousel.component';

import { SessionDataService }   from '../../services/session-data.service';
import { LoggerService }        from '../../services/logger.service';

// The following imports are to make webpack include the files
// in the build/release.
/*import '../../assets/img/gallery/academy/2017Graduation/group.jpg';
import '../../assets/img/gallery/academy/2017Graduation/JosephKelly.jpg';
import '../../assets/img/gallery/academy/2017Graduation/JohnCarey.jpg';*/


@Component({
  templateUrl: './html/galleryAcademy.component.html',
  styleUrls: [ './css/galleryAcademy.component.css' ]
})

export class GalleryAcademyComponent {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

	componentName:string = 'GalleryAcademyComponent';
	logdepth:number = 3;

    constructor( private lg$: LoggerService ) {}
        images: any[];
    ngOnInit() {
        this.lg$.setLogHdr(this.logdepth, this.componentName);

        this.images = [];
        this.images.push({source:'src/assets/img/gallery/academy/2017Graduation/group.jpg', alt:'Class of 2017', title:'Graduation 2017'});
        this.images.push({source:'src/assets/img/gallery/academy/2017Graduation/JosephKelly.jpg', alt:'Joseph Kelly receives his gratuation cert', title:'Joseph Kelly'});
        this.images.push({source:'src/assets/img/gallery/academy/2017Graduation/JohnCarey.jpg', alt:'John Carey receives his gratuation cert', title:'John Carey'});
    }

}
