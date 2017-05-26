import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoggerService }        from '../../services/logger.service';

/* Utility Modules */
import { DisplayUtilitiesModule } from '../../shared/displayUtilities.module';

/* Components in this module */
import { GalleryRoutingModule } from './gallery-routes.module';
import { GalleryHomeComponent } from './galleryHome.component';
import { GalleryAcademyComponent } from './galleryAcademy.component';

@NgModule({
    imports: [ CommonModule,
               FormsModule,
               DisplayUtilitiesModule,
               GalleryRoutingModule
             ],
    declarations: [ GalleryHomeComponent,
                    GalleryAcademyComponent
                  ],
    providers: [ 
                 LoggerService
               ]
})

export class GalleryModule {}