import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/src/app.module.ngfactory';
import { enableProdMode } from '@angular/core';
import { environment } from './components/environments/environment';
import { AppModule } from './app.module';

document.cookie = "XSRF-TOKEN=Dont-Tase-Me-Bro";

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);