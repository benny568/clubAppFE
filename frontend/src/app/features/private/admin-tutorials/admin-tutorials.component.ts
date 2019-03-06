import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../../services/logger.service';
import { CommonService } from '../../../services/common.service';
import { SessionDataService } from '../../../services/session-data.service';
import { UserService }   from '../../../services/user.service';

@Component({
  selector: 'app-admin-tutorials',
  templateUrl: './admin-tutorials.component.html',
  styleUrls: ['./admin-tutorials.component.css'],
  providers: [ LoggerService ]
})
export class AdminTutorialsComponent implements OnInit {

  componentName = 'AdminTutorialsComponent';
  logdepth = 0;
  loggedIn = '';

  constructor( private lg$: LoggerService,
               private com$: CommonService,
               public d$: SessionDataService,
               private user$: UserService )
  { 
    this.lg$.setLogHdr(this.logdepth, this.componentName);
  }

  ngOnInit() {
  }

}
