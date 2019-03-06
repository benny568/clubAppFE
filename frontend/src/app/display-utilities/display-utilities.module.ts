import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoggerService }        from '../services/logger.service';

/* Utility Components */
import { Slide } from './slide/slide.component';
import { Carousel } from './carousel/carousel.component';


@NgModule({
    imports: [ CommonModule,
             ],
    declarations: [ Slide,
                    Carousel
                  ],
    exports: [ Slide,
              Carousel          
            ],      
    providers: [ 
                 LoggerService
               ]
})

export class DisplayUtilitiesModule {}
