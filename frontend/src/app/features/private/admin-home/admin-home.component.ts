import { Component, OnInit } from '@angular/core';

import { SessionDataService } from '../../../services/session-data.service';
import { LoggerService } from '../../../services/logger.service';
import { CommonService } from '../../../services/common.service';
import { UserService }   from '../../../services/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  providers: [ LoggerService ]
})
export class AdminHomeComponent implements OnInit 
{
  componentName = 'AdminHomeComponent';
  logdepth = 0;
  loggedIn = '';

  constructor( private lg$: LoggerService,
               public d$: SessionDataService,
               private com$: CommonService,
               private user$: UserService ) { }

  ngOnInit() 
  {
    this.lg$.setLogHdr(this.logdepth, this.componentName);
    this.lg$.log("Username: " + this.user$.CurrentUser.username );
  }

}
