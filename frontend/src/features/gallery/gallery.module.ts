import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/*import { GalleriaModule } from 'primeng/primeng';*/

import { LoggerService }        from '../../services/logger.service';

import { GalleryRoutingModule } from './gallery-routes.module';
import { GalleryHomeComponent } from './galleryHome.component';
import { GalleryAcademyComponent } from './galleryAcademy.component';

@NgModule({
    imports: [ CommonModule,
               FormsModule,
               /*GalleriaModule,*/
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