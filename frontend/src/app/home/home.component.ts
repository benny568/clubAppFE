import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { CookieConsentComponent } from './../cookie-consent/cookie-consent.component';

import { LoggerService } from '../services/logger.service';
import { SessionDataService } from '../services/session-data.service';
import { CookieService } from '../services/cookie.service';

enum ReturnStatus { PRESENT, NOT_PRESENT, OK, NOT_OK };
@Component({
  selector   : 'app-home',
  templateUrl: './home.component.html',
  styleUrls  : ['./home.component.css'],
  providers  : [ LoggerService ]
})

export class HomeComponent {
  private componentName    : string  = 'HomeComponent';
  private logdepth         : number  = 3;
  public  showCookieConsent: boolean = false;
  public  consent          : boolean          = false;
  public  dialogRef        : MatDialogRef<CookieConsentComponent>;

  constructor(  private lg$: LoggerService,
                public d$     : SessionDataService,
                public cookie$: CookieService,
                public dialog : MatDialog )
  {
    this.lg$.setLogHdr(this.logdepth, this.componentName);

    this.lg$.trace("Cookie permission is: " + this.cookie$.isCookiePermissionGranted());

    switch( this.cookie$.isCookiePermissionGranted() )
    {
      case ReturnStatus.NOT_PRESENT:
        this.lg$.trace("No permission cookie detected, asking for permission.");
        this.dialogRef = this.dialog.open(CookieConsentComponent);
        this.dialogRef.afterClosed().subscribe(result => {
          this.lg$.trace('The dialog was closed with result: ' + result);
          this.d$.dsCookiesUserChoice = result;
          this.cookie$.savePermissionCookie();
        });
        break;
      case ReturnStatus.OK:
        this.lg$.trace("Permission to store cookies perviously granted.");
        if( this.cookie$.isVisitorCookiePresent() )
        {
          this.lg$.trace("Visitor cookie detected, not incrementing visitor count.");
        }
        else
        {
          this.lg$.trace("Visitor cookie NOT detected, incrementing visitor count on server.");
          this.cookie$.saveVisitorCookie();
          this.d$.incrementVisitorCount();
        }
        break;
      case ReturnStatus.NOT_OK:
        this.lg$.trace("Permission to store cookies perviously denied.");
        break;
    }
  }
}
