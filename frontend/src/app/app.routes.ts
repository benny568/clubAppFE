import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { AcademyHomeComponent } from './academy/academyHome.component';
import { AcademyOverviewComponent } from './academy/academyOverview.component';
import { AcademyCoachesComponent } from './academy/academyCoaches.component';
import { AcademyScheduleComponent } from './academy/academySchedule.component';
import { MerchandiseComponent } from './merchandise/merchandise.component';
import { FindUsComponent } from './findus/findUs.component';
import { MessageUsComponent } from './messageUs/messageUs.component';
import { ContactUsComponent } from './contactUs/contactUs.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { LinksComponent } from './links/links.component';
import { ClubHistoryComponent } from './clubHistory/clubHistory.component';
import { LoginComponent } from './login/login.component';
import { ViewTeamComponent } from './viewTeam/viewTeam.component';
import { FarViewComponent } from './farView/farView.component';
import { PhotosComponent } from './photos/photos.component';
import { academyRoutes } from './academy/academy.routes';
import { adminRoutes } from './admin/admin.routes';
import { fleadhRoutes } from './fleadh/fleadh.routes';

const routes: Routes = [
  { path: '',                        component: HomeComponent },
  { path: 'home',                    component: HomeComponent },
  { path: 'merchandise',             component: MerchandiseComponent },
  { path: 'findUs',                  component: FindUsComponent },
  { path: 'messageUs',               component: MessageUsComponent },
  { path: 'contactUs',               component: ContactUsComponent },
  { path: 'downloads',               component: DownloadsComponent },
  { path: 'links',                   component: LinksComponent },
  { path: 'clubHistory',             component: ClubHistoryComponent },
  { path: 'login',                   component: LoginComponent },
  { path: 'viewTeam',                component: ViewTeamComponent },
  { path: 'farView',                 component: FarViewComponent },
  { path: 'media/:cat1/:cat2/:cat3', component: PhotosComponent },
  ...academyRoutes,
  ...adminRoutes,
  ...academyRoutes,
  ...fleadhRoutes
];

export const appRoutingProviders: any[] = [

];

export const appRoutes: any = RouterModule.forRoot(routes, { useHash: true });
