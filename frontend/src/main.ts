import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './components/environments/environment';
import { AppModule } from './app.module';

/* The following imports are needed for webpack */
import './assets/css/styles.css';
import './assets/img/stadium1.jpg';
import './assets/img/banner.png';
import './assets/img/academy/flag.gif';
/*import './favicon.ico';*/
import './assets/img/fleadh/parking.png';
/* Read all files in a dir using require.context(dir,read sub dirs, regex) */
/*require.context('./assets/img/news', false, /\.(png|jpe?g|gif|ico)$/);*/

document.cookie = "XSRF-TOKEN=Dont-Tase-Me-Bro";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);