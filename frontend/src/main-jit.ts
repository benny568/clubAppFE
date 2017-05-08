import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './components/environments/environment';
import { AppModule } from './app.module';

document.cookie = "XSRF-TOKEN=Dont-Tase-Me-Bro";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);