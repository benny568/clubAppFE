import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AcademyModule } from './../features/academy/academy.module';
import { TeamsModule } from './../features/teams/teams.module';

import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';
import { MerchandiseComponent } from '../merchandise/merchandise.component';
import { FindUsComponent } from '../find-us/find-us.component';
import { MessageUsComponent } from '../message-us/message-us.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { DownloadsComponent } from '../downloads/downloads.component';
import { LinksComponent } from '../links/links.component';
import { ClubHistoryComponent } from '../club-history/club-history.component';
import { LoginComponent } from '../login/login.component';
import { PhotosComponent } from '../photos/photos.component';
import { VideosComponent } from './../videos/videos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'merchandise', component: MerchandiseComponent },
  { path: 'findUs', component: FindUsComponent },
  { path: 'messageUs', component: MessageUsComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'downloads', component: DownloadsComponent },
  { path: 'links', component: LinksComponent },
  { path: 'clubHistory', component: ClubHistoryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'media/:cat1/:cat2/:cat3', component: PhotosComponent },
  { path: 'video/:cat1/:cat2/:cat3', component: VideosComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
