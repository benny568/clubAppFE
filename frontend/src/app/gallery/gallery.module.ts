import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoggerService }        from '../services/logger.service';


/* Utility Modules */
import { DisplayUtilitiesModule } from '../display-utilities/display-utilities.module';

/* Components in this module */
import { GalleryRoutingModule } from './gallery-routing.module';
//import { GalleryHomeComponent } from './galleryHome.component';
import { AcademyGalleryComponent } from './academy-gallery/academy-gallery.component';

@NgModule({
    imports: [ CommonModule,
               FormsModule,
               DisplayUtilitiesModule,
               GalleryRoutingModule,
               //MenuModule
             ],
    declarations: [ //GalleryHomeComponent,
                    AcademyGalleryComponent
                  ],
    providers: [ 
                 LoggerService
               ]
})

export class GalleryModule {}
