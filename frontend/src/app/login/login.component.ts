import { Headers } from '@angular/http';
import { Component }          from '@angular/core';
import { Router }             from '@angular/router';
import { FormGroup,
	     Validators,
		 FormBuilder }        from '@angular/forms';

import { SessionDataService } from '../services/session-data.service';
import { LoggerService }      from '../services/logger.service';
import { LoginService }       from '../services/login.service';
import { UserService }        from '../services/user.service';

import { User }               from '../model/site-user';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoggerService ]
})

export class LoginComponent {

	componentName = 'LoginComponent';
	logdepth = 2;
	form: FormGroup;
	loginDetails: { username: string, password: string};
	showPassword: string = 'password';
	message: string = '';
	showMsg: boolean = false;

	constructor( private lg$: LoggerService,
				 private login$: LoginService,
				 private user$: UserService,
				 private _router: Router,
				 private fb: FormBuilder )
	{
		this.lg$.setLogHdr(this.logdepth, this.componentName);
		this.loginDetails = { username: '', password: ''};
		this.showMsg = false;

		this.form = fb.group({
            "username":["", Validators.required],
            "password":["", Validators.required]
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

	onSubmit(form: any): void {
		this.lg$.log( "->onSubmit(): you submitted values:" + form.username + ":" + form.password);
		this.user$.CurrentUser.username = form.username;

		this.login$.sendCredential( form.username, form.password )
			.subscribe(
				res => {
							if( res.status === 200 )
							{
								this.lg$.log("SUCCESS !!!!!!!!!!!!!!!");
								this.lg$.log("BODY: " + res.text() );
								this.saveJwt(res.text());
								this.user$.setUserAsAuthenticated();
								this.lg$.log("Routing to home page");
								this._router.navigate( ['adminhome', {}] );
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

		this.user$.getUserDetails( username )
			.subscribe(
				data => this.setUserDetails(data.json()),
				err => console.log("ERROR: Cannot retrieve user details from server!")
			);
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

