import { Component, OnInit }  from '@angular/core';
import { DomSanitizer }       from '@angular/platform-browser';
import { Router }             from '@angular/router';
import { Http, Headers, 
         RequestOptions }     from '@angular/http';
import { MdIconRegistry }     from '@angular/material';

import { SessionDataService } from './services/session-data.service';
import { LoggerService }      from './services/logger.service';
import { CommonService }      from './services/common.service';
import { LoginService }       from './services/login.service';
import { UserService }        from './services/user.service';

import './assets/css/styles.css';
import './favicon.ico';

@Component({
  selector: 'app-root',
  template: require('./app.component.html'),
  styles: [require('./app.component.css').toString()],
})
export class AppComponent implements OnInit {

  componentName: string = 'AppComponent';
  logdepth: number = 0;
  loggedIn = '';

  constructor( private lg$: LoggerService,
               private d$: SessionDataService,
               private com$: CommonService,
               private login$: LoginService,
               private user$: UserService,
               private router: Router,
               private _http: Http )
  {
    this.lg$.setLogHdr(this.logdepth, this.componentName);

    // Load the teams to use in the menu system
    this.d$.dsGetTeams();
  }

  public ngOnInit() {

  }

  logout()
  {
    this.login$.logout();
    localStorage.setItem('AdminHasLoggedIn', 'false');
    this.d$.dsAuthenticated = false;
    this.lg$.log('User login status: ' + this.d$.dsAuthenticated );
		this.lg$.log("USER LOGGED OUT!!");
    window.location.href="/";
		//this.router.navigate( ['home', {}] );
  }

}
