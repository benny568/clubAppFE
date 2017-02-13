import { Component }          from '@angular/core';
import { Router }             from '@angular/router';
import { FormGroup,
	       Validators,
	       FormBuilder }        from '@angular/forms';

import { SessionDataService } from '../services/session-data.service';
import { LoggerService }      from '../services/logger.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})

export class LoginComponent {

	componentName = 'LoginComponent';
	logdepth = 2;
	form: FormGroup;
	loginDetails;

	constructor( private lg$: LoggerService,
			         private d$: SessionDataService,
			         private _router: Router,
			         private fb: FormBuilder )
	{
		this.lg$.setLogHdr(this.logdepth, this.componentName);
		this.loginDetails = { username: '', password: ''};
		this.form = fb.group({
            "username":["", Validators.required],
            "password":["", Validators.required]
        });
	}

	login(user)
	{
		this.lg$.log("#### login() function called...");
		this.lg$.log("username: " + user.username );
		this.lg$.log("password: " + user.password );
	}


//	onSubmit(form: any): void {
//		this.lg$.log( "->onSubmit(): you submitted value:" + this.form);
//
//		var subscriber = this.d$.authenticate2( this.form.value, this.getUserDetails2(this.form.value.username) );
//	}

	onSubmit(form: any): void {
		this.lg$.log( "->onSubmit(): you submitted values:" + this.form);

		var subscriber = this.d$.authenticate( this.form.value.username, this.form.value.password );
		subscriber.subscribe(
								data => this.getUserDetails(this.form.value.username, data),
								err => console.log("ERROR: " + err)
								);
	}

	getUserDetails(username, data)
	{
		this.lg$.log("->getUserDetails(" + username + "): " + data );

		this.d$.dsCurrentUser.username = username;

		var subscriber = this.d$.getUser( username );
		subscriber.subscribe(
								data => this.d$.dsCurrentUser = data,
								err => console.log("ERROR: " + err),
								() => this.goToAdmin( username )
							);
	}

	getUserDetails2(username)
	{
		this.lg$.log("->getUserDetails2(" + username + ")");

		this.d$.dsCurrentUser.username = username;

		var subscriber = this.d$.getUser( username );
		subscriber.subscribe(
								data => this.d$.dsCurrentUser = data,
								err => console.log("ERROR: " + err),
								() => this.goToAdmin( username )
							);
	}

	goToAdmin( username )
	{
		this.lg$.log("->goToAdmin(" + username + ")" );
		this.d$.dsCurrentUser.username = username;
		this.d$.dsAuthenticated = true;
		this.lg$.log("######>>>>>> AUTHENTICATED: [" + this.d$.dsCurrentUser.username + "] <<<<<<#####");
		this.lg$.log("Authenticated: " + this.d$.dsAuthenticated );
		this._router.navigate( ['adminHome', {}] );
	}

}
