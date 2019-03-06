import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SessionDataService } from './../services/session-data.service';
import { LoggerService } from '../services/logger.service';

@Component({
  selector   : 'cookie-consent-banner',
  templateUrl: './cookie-consent.component.html',
  styleUrls  : ['./cookie-consent.component.css'],
  providers  : [ LoggerService ]
})

export class CookieConsentComponent implements OnInit {
  componentName :string = 'CookieConsentComponent';
  logdepth      :number = 2;

  constructor(  public  d$ : SessionDataService,
                private lg$                         : LoggerService,
                public  dialogRef                   : MatDialogRef<CookieConsentComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any )
                { }

  ngOnInit() {
    this.lg$.setLogHdr(this.logdepth, this.componentName);
  }

  public noCookies()
  {
    this.lg$.trace("User has said NO to cookies :(");
    this.dialogRef.close(false);
  }

  public cookiesOk()
  {
    this.lg$.trace("User has said OK to cookies :)");
    this.dialogRef.close(true);
  }
}
