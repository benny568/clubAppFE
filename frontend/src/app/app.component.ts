import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MdIconRegistry } from '@angular/material';

import { SessionDataService } from './services/session-data.service';
import { LoggerService } from './services/logger.service';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  componentName: String = 'AppComponent';
  logdepth: number = 0;

  constructor( private lg$: LoggerService,
               public d$: SessionDataService,
               private com$: CommonService,
               private router: Router,
               private _http: Http )
  {
    this.lg$.setLogHdr(this.logdepth, this.componentName);

    this.lg$.log('constructor()');

    // Load the teams to use in the menu system
    this.d$.dsGetTeams();
  }

  public ngOnInit() {

  }

}
