import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/src/app.module.ngfactory';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import 'zone.js';
import 'reflect-metadata';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory).catch(err => console.error(err));