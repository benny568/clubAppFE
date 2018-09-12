import { Injectable } from '@angular/core';

import { LoggerService } from './logger.service';
import { CommonService } from './common.service';

@Injectable()
export class CookieService {
  logdepth      = 3;
  loghdr        = "";
  serviceName   = 'CookieService';
  VisitorCookie = "clubAppVisitor=1";
  CookieExpiry  = 86400/4;             // 86400 is one day so this is 6hrs

  constructor( private lg$: LoggerService,
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
    this.lg$.log("-> saveVisitorCookie() : Cookies: " + document.cookie );
  }

  /**********************************************************
   * Name       : getVisitorCookie()
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

    this.lg$.log("-> getVisitorCookie() : Retrieved visitor cookie: " + visitorPresent);
    return visitorPresent;
  }

}
