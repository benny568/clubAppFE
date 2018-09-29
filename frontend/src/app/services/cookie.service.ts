import { Injectable } from '@angular/core';

import { LoggerService } from './logger.service';
import { CommonService } from './common.service';
import { SessionDataService } from './session-data.service';

enum ReturnStatus { PRESENT, NOT_PRESENT, OK, NOT_OK };
@Injectable()
export class CookieService {
  logdepth         = 3;
  loghdr           = "";
  serviceName      = 'CookieService';
  VisitorCookie    = "clubAppVisitor=1";
  PermissionCookie = "cookiesAllowed";
  CookieExpiry     = 86400/4;             // 86400 is one day so this is 6hrs

  constructor(  private lg$ : LoggerService,
                public  d$  : SessionDataService,
                private com$: CommonService )
  {
    this.lg$.setLogHdr(this.logdepth, this.serviceName);
  }

  /**********************************************************
   * Name       : saveVisitorCookie()
   * Description: Writes a cookie to say this user has visited
   *              the site, it expires after a period. This
   *              way we only increase the visitor count after
   *              a period of time for the same user.
   * Scope    : External
   * Params in: None
   * Return   : None
   **********************************************************/
  public saveVisitorCookie()
  {
    let expires = new Date(Date.now() + this.CookieExpiry);  // 1 day

    document.cookie = this.VisitorCookie + ";expires=" + expires + ";path=/;";
    this.lg$.trace("-> saveVisitorCookie() : Cookies: " + document.cookie );
  }

  /**********************************************************
   * Name       : savePermissionCookie()
   * Description: Writes a cookie to store the user's choice
   *              on whether it's ok to save cookies or not.
   * Scope    : External
   * Params in: None
   * Return   : None
   **********************************************************/
  public savePermissionCookie()
  {
    let expires = new Date(Date.now() + this.CookieExpiry*30);  // 30 days

    document.cookie = this.PermissionCookie + "=" + this.d$.dsCookiesUserChoice + ";expires=" + expires + ";path=/;";
    this.lg$.trace("-> savePermissionCookie() : Cookies: " + document.cookie );
  }

  /**********************************************************
   * Name       : isVisitorCookiePresent()
   * Description: Reads the cookies and parses the string to
   *              see if we have a visitor cookie. If we have
   *              then return true, otherwise false.
   * Scope    : External
   * Params in: None
   * Return   : true if cookie exists, false otherwise
   **********************************************************/
  public isVisitorCookiePresent(): boolean
  {
    let fullcookie: string      = document.cookie;
    let visitorPresent: boolean = fullcookie.includes(this.VisitorCookie);

    this.lg$.trace("-> isVisitorCookiePresent() : Retrieved visitor cookie: " + visitorPresent);
    return visitorPresent;
  }

  /**********************************************************
   * Name       : isCookiePermissionGranted()
   * Description: Reads the cookies and parses the string to
   *              see if we have a cookie indicating that the
   *              user has said it's ok to store cookies.
   * Scope    : External
   * Params in: None
   * Return   : true if cookie exists, false otherwise
   **********************************************************/
  public isCookiePermissionGranted(): ReturnStatus
  {
    let status           : ReturnStatus;
    let fullcookie       : string         = document.cookie;
    let permissionPresent: boolean = fullcookie.includes(this.PermissionCookie);

    this.lg$.trace("Cookie String: [" + fullcookie + "]");

    if( permissionPresent )
    {
      // (1) Split the string into individual cookies
      let cookies: string[] = fullcookie.split(';', 100);
      // (2) Find the permission cookie
      for( let i=0; i<cookies.length; i++ )
      {
        this.lg$.trace("Checking cookie: [" + cookies[i] + "]")
        if( cookies[i].includes(this.PermissionCookie) )
        {
          this.lg$.trace("Found permission cookie: " + cookies[i] + "]")
          let parts: string[] = cookies[i].split('=', 2);
          if( parts[1] === "true" )
          {
            this.lg$.trace("Returning true");
            status = ReturnStatus.OK;
          }
          else
          {
            this.lg$.trace("Returning false");
            status = ReturnStatus.NOT_OK;
          }
        }
      }
    }
    else
      status = ReturnStatus.NOT_PRESENT;

    return status;
  }

}
