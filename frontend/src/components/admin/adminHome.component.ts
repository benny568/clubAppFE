import { Component }          from '@angular/core';

import { SessionDataService } from '../../services/session-data.service';
import { LoggerService }      from '../../services/logger.service';
import { UserService }        from '../../services/user.service';


@Component({
	//templateUrl: 'app/htmltemplates/adminHome.component.html',
	template: `
		<div class="container">
			<div class="panel" style="marign-right:50px;">
				<div class="panel-heading avenue-heading" style="min-height:35px;">
					Avenue United Administration Home Page
				</div>
				<div class="panel-body avenue-body" style="height:100%;">
					Welcome <strong>{{user$.CurrentUser.username}}</strong> to the administration portal!<br><br>
					From here you can add, edit, remove, various details of the club records such
					 as member information, upload news stories and photos and manage your team. 
					 Take a look at the tutorials section for more information on how to perform certain tasks.
				</div>
			</div> <!-- end panel -->

		</div> <!-- end of container -->
	`
})

export class AdminHomeComponent
{
	componentName = 'AdminHomeComponent';
	logdepth = 2;

	constructor( private lg$: LoggerService, 
                 private d$: SessionDataService,
				 public user$: UserService ) {
		this.lg$.setLogHdr(this.logdepth, this.componentName);

		this.lg$.log("User is: " + this.user$.getUserName());
	}

}
