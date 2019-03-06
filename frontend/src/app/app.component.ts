import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers,
         RequestOptions } from '@angular/http';

import { LoggerService } from './services/logger.service';
import { CommonService } from './services/common.service';
import { SessionDataService } from './services/session-data.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { CookieService } from './services/cookie.service';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.css'],
  providers  : [ LoggerService ]
})
export class AppComponent implements OnInit {

  componentName = 'AppComponent';
  logdepth      = 0;
  loggedIn      = '';

  constructor( private lg$    : LoggerService,
               private com$   : CommonService,
               public  d$     : SessionDataService,
               public auth$   : AuthService,
               public  user$  : UserService,
               public  cookie$: CookieService,
               private router : Router,
               private _http  : Http )
  {
    this.lg$.setLogHdr(this.logdepth, this.componentName);

    // Load the teams to use in the menu system
    this.d$.dsGetTeams();
  }

  public ngOnInit() {
  }

  goToTeamView(team) {
    this.lg$.log('-> goToTeamView(' + team + ')');
    this.d$.loadTeamDetailsByNameByObservable(team, this.logdepth)
    		.subscribe( data => this.getTeamMembers( data ),
						error => this.lg$.log('ERROR: Reading team details from server, team: ' + team),
						()    => this.lg$.log('<-- Team details read successfully for team: ' + team)
					  );
    }

    getTeamMembers( data )
    {
    	this.lg$.log("-> getTeamMembers()");
    	this.d$.dsCurrentTeam = data;
    	this.lg$.log("  |-- Data returned, id: " + this.d$.dsCurrentTeam.id);
    	this.lg$.log("  |-- Data returned, team name: " + this.d$.dsCurrentTeam.name);
    	this.lg$.log("  |-- Data returned, lrcode: " + this.d$.dsCurrentTeam.lrcode);
    	this.lg$.log("  |-- Data returned, lrFixturesCode: " + this.d$.dsCurrentTeam.lrFixturesCode);
    	this.lg$.log("  |-- Data returned, lrResultsCode: " + this.d$.dsCurrentTeam.lrResultsCode);
    	this.lg$.log("  |-- Data returned, noticeboard: " + this.d$.dsCurrentTeam.noticeboard);
    	this.d$.loadTeamMembersByIdByObservable(this.d$.dsCurrentTeam.id)
	        .subscribe( data => this.changeToTeamPage( data ),
						error => this.lg$.log("ERROR: Reading team members from server, team: " + this.d$.dsCurrentTeam.name),
						()    => this.lg$.log("<-- Team members read successfully for team: " + this.d$.dsCurrentTeam.name)
					  );
    }

    changeToTeamPage( data )
    {
    	this.lg$.log("-> changeToTeamPage()");
    	this.d$.dsTeamMembers = data;

    	for ( var i = 0; i < this.d$.dsTeamMembers.length; i++ )
    	{
    		this.lg$.log("  |-- Members returned, " + i + ": " + this.d$.dsTeamMembers[i].name);
    	}


    	this.router.navigate(['/viewTeam']);
    }


    goToFarView(team)
    {
    	this.lg$.log("-> goToFarView(" + team + ")");
    	this.d$.loadTeamDetailsByNameByObservable(team, this.logdepth)
    		.subscribe( data => this.changeToFarPage( data ),
						error => this.lg$.log("ERROR: Reading team details from server, team: " + team),
						()    => this.lg$.log("<-- Team details read successfully for team: " + team)
					  );
    }

    changeToFarPage( data )
    {
    	this.lg$.log("-> changeToFarPage()");

    	this.d$.dsCurrentTeam = data;
    	this.lg$.log("  |-- Data returned, id: " + this.d$.dsCurrentTeam.id);
    	this.lg$.log("  |-- Data returned, team name: " + this.d$.dsCurrentTeam.name);
    	this.lg$.log("  |-- Data returned, lrcode: " + this.d$.dsCurrentTeam.lrcode);
    	this.lg$.log("  |-- Data returned, lrFixturesCode: " + this.d$.dsCurrentTeam.lrFixturesCode);
    	this.lg$.log("  |-- Data returned, lrResultsCode: " + this.d$.dsCurrentTeam.lrResultsCode);
    	this.lg$.log("  |-- Data returned, noticeboard: " + this.d$.dsCurrentTeam.noticeboard);
    	this.router.navigate(['/farView']);
    }

  logout()
  {
    this.auth$.logout();
    localStorage.setItem('AdminHasLoggedIn', 'false');
    localStorage.removeItem('id_token');
    this.d$.dsAuthenticated = false;
    this.lg$.log('User login status: ' + this.d$.dsAuthenticated );
		this.lg$.log("USER LOGGED OUT!!");
    window.location.href = "/";
		//this.router.navigate( ['home', {}] );
  }

  private saveVisitorCookie()
  {
    let expires = new Date(Date.now() + 86400);

    document.cookie = "visitor=1;expires=" + expires + ";path=/;";
    this.lg$.log("-> saveVisitorCookie() : Cookies: " + document.cookie );
  }

  getVisitorCookie(): string
  {
    let visitor = document.cookie;
    this.lg$.log("-> getVisitorCookie() : Retrieved visitor cookie: " + visitor);
    return visitor;
  }

  updateVisitorCount(): void
  {
    this.lg$.log("-> updateVisitorCount()");

    this.d$.incrementVisitorCount();

    this.lg$.log("<- updateVisitorCount");
  }

}

