import { Headers } from '@angular/http';
import { Component }          from '@angular/core';
import { Router }             from '@angular/router';
import { FormGroup,
	       Validators,
		     FormBuilder }        from '@angular/forms';

import { SessionDataService } from '../services/session-data.service';
import { LoggerService }      from '../services/logger.service';
import { AuthService }       from '../services/auth.service';
import { UserService }        from '../services/user.service';

import { User }               from '../model/site-user';

@Component({
  templateUrl: './login.component.html',
  styleUrls  : ['./login.component.css'],
  providers  : [ LoggerService ]
})

export class LoginComponent {

	componentName = 'LoginComponent';
	logdepth      = 2;
	form        : FormGroup;
	loginDetails: { username: string, password: string};
	showPassword: string = 'password';
	message     : string = '';
	showMsg     : boolean = false;
	username    : string;
	password    : string;

	constructor( private lg$    : LoggerService,
				 private auth$  : AuthService,
				 private user$  : UserService,
				 private _router: Router,
				 private fb     : FormBuilder )
	{
		this.lg$.setLogHdr(this.logdepth, this.componentName);
		this.loginDetails = { username: '', password: ''};
		this.showMsg      = false;

		this.form = fb.group({
            "username": ["", Validators.required],
            "password": ["", Validators.required]
        });

		if( localStorage.getItem('AdminHasLoggedIn') === '' || localStorage.getItem('AdminHasLoggedIn') === null )
		{
			this.user$.usLoggedIn = false;
		}
		else
		{
			this.user$.usLoggedIn = true;
		}
	}

	login(): void {
		this.lg$.log( "->onSubmit(): you submitted values:" + this.username + ":" + this.password);
		this.user$.CurrentUser.name = this.username;

		this.auth$.authenticate( this.username, this.password )
			.subscribe(
				res => {
							if( res.status === 200 )
							{
                				this.lg$.log("SUCCESS !!!!!!!!!!!!!!!");
								this.lg$.log("BODY: " + res.text() );
								this.saveJwt(res.text());
								this.user$.setUserAsAuthenticated();
								this.auth$.isLoggedIn(); // TEMP
								this.lg$.log("Routing to home page");
								this._router.navigate( ['adminHome', {}] );
							}
				},
				err => {
						this.lg$.error("ERROR: " + err);

						if( err.status === 401 )
						{
							this.message = 'Incorrect username and/or password!';
							this.showMsg = true;
						}
						else if( err.status === 403 )
						{
							this.lg$.log("Wrong username/password: " + err.statusText);
						}
				}
			);
	}

	private saveJwt(jwt) {
		if(jwt) {
		  localStorage.setItem('id_token', jwt);
		  this.lg$.log("JWT: " + jwt );
		}
	}

	private getUserDetails( username: string )
	{

		// this.user$.getUserDetails( username )
		// 	.subscribe(
		// 		data => this.setUserDetails(data.json()),
		// 		err  => console.log("ERROR: Cannot retrieve user details from server!")
		// 	);
	}

	private setUserDetails( user: User )
	{
		this.lg$.log("-> setUserDetails()");
		this.user$.setCurrentUser( user );
		this._router.navigate( ['adminHome', {}] );
	}

	toggleShowPassword()
	{
		if( this.showPassword === 'password' )
		{
			this.showPassword = 'text';
		}
		else
		{
			this.showPassword = 'password';
		}
	}

}

