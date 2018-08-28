import { CommonService } from './../../../services/common.service';
import { Component, OnInit } from '@angular/core';

import { Member }         from '../../../model/member';

import { LoggerService }   from '../../../services/logger.service';
import { AcademyRegistrationService } from './../academy-registration/academy-registration.service';

@Component({
  selector   : 'app-academy-registration-success',
  templateUrl: './academy-registration-success.component.html',
  styleUrls  : ['./academy-registration-success.component.css'],
  providers  : [ LoggerService ]
})

export class AcademyRegistrationSuccessComponent implements OnInit {
  componentName:string  = 'AcademyRegistrationSuccessComponent';
  logdepth      :number = 4;
  destEmail     :String = '';

  constructor(  private lg$: LoggerService,
                public ar$ : AcademyRegistrationService,
                public com$: CommonService
   ) {}

  ngOnInit() {
    this.lg$.setLogHdr(this.logdepth, this.componentName);
    this.lg$.log("ngOnInit()");

    // (1) Get current member details from the stored cookie
    let currMember :Member = this.ar$.getMemberCookie();
        this.destEmail     = currMember.email;
    this.lg$.log("[-->sendEmailConfirmation()..to [" + currMember.email + "]");

    // (2) Store the new member in the db
    this.ar$.storeDetails( currMember );

    // (3) Send the confirmation email to the person
    this.ar$.sendEmailConfirmation( currMember );
  }

}
