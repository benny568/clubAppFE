import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../../services/logger.service';
import { CommonService } from '../../../services/common.service';
import { SessionDataService } from '../../../services/session-data.service';
import { UserService }   from '../../../services/user.service';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.css'],
  providers: [ LoggerService ]
})
export class AdminOverviewComponent implements OnInit 
{
  componentName = 'AdminOverviewComponent';
  logdepth = 0;
  loggedIn = '';

  constructor( private lg$: LoggerService,
               private com$: CommonService,
               public d$: SessionDataService,
               public user$: UserService ) { }

  ngOnInit() 
  {
    this.lg$.setLogHdr(this.logdepth, this.componentName);
  }

}
