import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryHomeComponent } from './galleryHome.component';
import { GalleryAcademyComponent } from './galleryAcademy.component';


const galleryRoutes: Routes = [
        { path: 'gallery', component: GalleryHomeComponent },
        { path: 'galleryHome', component: GalleryHomeComponent },
		    { path: 'academyGallery', component: GalleryAcademyComponent }
	];

@NgModule({
  imports: [RouterModule.forChild(galleryRoutes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule {}