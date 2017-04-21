import { NgModule }             from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home';
import { MerchandiseComponent } from './components/merchandise/merchandise.component';
import { FindUsComponent } from './components/findus/findUs.component';
import { MessageUsComponent } from './components/messageUs/messageUs.component';
import { ContactUsComponent } from './components/contactUs/contactUs.component';
import { DownloadsComponent } from './components/downloads/downloads.component';
import { LinksComponent } from './components/links/links.component';
import { ClubHistoryComponent } from './components/clubHistory/clubHistory.component';
import { LoginComponent } from './components/login/login.component';
import { ViewTeamComponent } from './components/viewTeam/viewTeam.component';
import { FarViewComponent } from './components/farView/farView.component';
import { PhotosComponent } from './components/photos/photos.component';
import { adminRoutes } from './components/admin/admin.routes';
import { fleadhRoutes } from './components/fleadh/fleadh.routes';

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
  { path: 'viewTeam', component: ViewTeamComponent },
  { path: 'farView', component: FarViewComponent },
  { path: 'media/:cat1/:cat2/:cat3', component: PhotosComponent }, 
  /*{ path: 'academyHome', loadChildren: 'components/academy/academy.module#AcademyModule' },*/
  ...adminRoutes,
  ...fleadhRoutes
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}