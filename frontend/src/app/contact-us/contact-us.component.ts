import { Component, OnInit } from '@angular/core';

import { Officer } from './../model/officer';

import { SessionDataService } from '../services/session-data.service';
import { LoggerService } from '../services/logger.service';
import { CommonService } from '../services/common.service';

@Component({
  templateUrl: './contact-us.component.html',
  styleUrls  : ['./contact-us.component.css' ],
  providers  : [ LoggerService ]
})

export class ContactUsComponent implements OnInit {
  componentName = 'ContactUsComponent';
  logdepth      = 2;
  officers: Officer[];

  constructor(  private d$: SessionDataService,
                private lg$ : LoggerService,
                private com$: CommonService ) { }

  ngOnInit() {
    this.lg$.setLogHdr(this.logdepth, this.componentName);
    this.d$.getClubOfficers()
        .subscribe( data => this.officers = data,
                    err => console.error("DataService: ERROR reading officers from server!"),
                    ()  => console.log(" <== Officers received from server <==")
                  );
  }
}
