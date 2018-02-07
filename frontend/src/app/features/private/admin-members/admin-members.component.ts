import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../../services/logger.service';
import { CommonService } from './../../../services/common.service';
import { SessionDataService } from '../../../services/session-data.service';
import { MemberService } from '../../../services/member.service';

import { Member } from './../../../model/member';

@Component({
  selector: 'app-admin-members',
  templateUrl: './admin-members.component.html',
  styleUrls: ['./admin-members.component.css'],
  providers: [ LoggerService ]
})
export class AdminMembersComponent implements OnInit {

  componentName = 'AdminMembersComponent';
  logdepth = 0;
  loggedIn = '';
  showArray: boolean[];
  date =  new Date();

  constructor( private lg$: LoggerService,
               private com$: CommonService,
               public d$: SessionDataService,
               private mbr$: MemberService ) 
  { 
    this.lg$.setLogHdr(this.logdepth, this.componentName);
  }

  ngOnInit() {
    this.showArray = new Array<boolean>();
  }

  toggleView( team: number )
  {
    this.lg$.log("-> toggleView(" + team + ")");
    this.showArray[team] = !this.showArray[team];
    this.lg$.log("      |- display for team " + team + " set to [" + this.showArray[team] + "]");
    this.lg$.log("<-----|");
  }

  allMembersAdmin()
  {
    this.lg$.log("-> allMembersAdmin()");
  }

  getMembers4team( team: number )
  {
      this.lg$.log("    --> getMembers4team(" + team + ")");
      this.mbr$.loadCurrentTeamMembersByTeamId( team, this.gotTeamMembers(this.lg$, this.showArray) );
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
  gotTeamMembers( logger: LoggerService, array )
  {
    return function( team: number )
    {
      logger.log("-> gotTeamMembers(" + team + ")");
      array[team] = !array[team];
      logger.log("      |- display for team " + team + " set to [" + array[team] + "]");
      logger.log("<-----|");
    }
  }

  /**********************************************************
     * Name:		editMember()
     * Description:	Edit the current selected member
     * Scope:		Internal
     * Params in:	None
     * Return:
     **********************************************************/
    editMember( member: Member )
    {
      this.lg$.log("    |-> editMember(" + member.name + ")");
    	var home = this.com$.getHome();
    	let memberUrl = home + '/admin/member/' + member.id;

    	this.lg$.log("URL: " + memberUrl);
    }
}
