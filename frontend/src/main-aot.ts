import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/src/app.module.ngfactory';
import { enableProdMode } from '@angular/core';
import { environment } from './components/environments/environment';
import { AppModule } from './app.module';

document.cookie = "XSRF-TOKEN=Dont-Tase-Me-Bro";

import 'zone.js';
import 'reflect-metadata';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory).catch(err => console.error(err));