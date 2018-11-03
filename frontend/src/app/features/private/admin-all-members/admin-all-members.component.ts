import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../../services/logger.service';
import { CommonService } from './../../../services/common.service';
import { SessionDataService } from '../../../services/session-data.service';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-admin-all-members',
  templateUrl: './admin-all-members.component.html',
  styleUrls: ['./admin-all-members.component.css']
})
export class AdminAllMembersComponent implements OnInit {
  season: String;

  constructor(  private lg$: LoggerService,
                private com$: CommonService,
                public d$: SessionDataService,
                public mbr$: MemberService )
    {
      //this.season = this.com$.calculateCurrentSeason();
    }

  ngOnInit() {
    console.log("###### Calling calculateCurrentSeason() from component Init..");
    this.season = this.com$.calculateCurrentSeason();
    console.log("Back from calculateCurrentSeason() and the season is: " + this.season );
    this.mbr$.getAllMembers( this.gotMembers( this.lg$, this.mbr$ ) );
  }

  /**********************************************************
   * Name:		gotTeamMembers()
   * Description:	Sets up a callback using closures so that
   *              the display array can be toggled when the
   *              team members are loaded.
   * Scope:		Internal
   * Params in:	logger - the logger service for the component
   *            array  - the showArray
   * Return: A function to be used as a callback when the
   *         team members are returned from the server.
   **********************************************************/
  gotMembers( logger: LoggerService, memberService: MemberService  )
  {
    return function()
    {
      logger.log("-> gotMembers()");
      logger.log("   Loaded " + memberService.msAllMembers.length + " members.");
      logger.log("<-----|");
    }
  }

}
