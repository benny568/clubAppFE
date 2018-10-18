import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoggerService } from '../../../services/logger.service';
import { CommonService } from './../../../services/common.service';
import { SessionDataService } from '../../../services/session-data.service';
import { MemberService } from '../../../services/member.service';

import { Member } from './../../../model/member';
import { Team } from '../../../model';

@Component({
  selector   : 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls  : ['./edit-member.component.css'],
  providers  : [ LoggerService ]
})
export class EditMemberComponent implements OnInit {
  componentName: string   = 'EditMemberComponent';
  logdepth     : number   = 2;
  logPrefix    : string   = '';
  startDate    : Date = new Date();
  teams        : Array<Team>;
  member       : Member;
  team         : string;
  team2        : string;
  team3        : string;
  position     : string;
  position2    : string;
  position3    : string;
  options      : string[];
  myControl    : FormControl;

  constructor( private lg$                         : LoggerService,
               private com$                        : CommonService,
               public  d$                          : SessionDataService,
               private mbr$                        : MemberService,
               public  dialogRef                   : MatDialogRef<EditMemberComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any )
  {
    this.lg$.setLogHdr(this.logdepth, this.componentName);
  }

  /*********************************************************
   * To display the teams as strings it's necessary to store
   * them locally as the value and ngModel parameters need
   * to be the same in the html for it to work.
   */
  ngOnInit() {
    this.myControl = new FormControl();
    this.buildTeamDropDown();

    // If value is 0 then this is no team so substute 'None'
    // this.team = this.data.member.team !== 0 ? this.d$.dsTeams[this.data.member.team].name : "None";
    // this.team2 = this.data.member.team2 !== 0 ? this.d$.dsTeams[this.data.member.team2].name : "None";
    // this.team3 = this.data.member.team3 !== 0 ? this.d$.dsTeams[this.data.member.team3].name : "None";
    this.team = this.options[this.data.member.team];
    this.lg$.log("ngOnInit()->team set to: " + this.team );
    this.team2 = this.options[this.data.member.team2];
    this.lg$.log("ngOnInit()->team2 set to: " + this.team2 );
    this.team3 = this.options[this.data.member.team3];
    this.lg$.log("ngOnInit()->team3 set to: " + this.team3 );

    this.position = this.d$.dsPosition[this.data.member.position];
    this.lg$.log("position set to: " + this.position + ", " + this.data.member.position);
    this.position2 = this.d$.dsPosition[this.data.member.position2];
    this.lg$.log("position2 set to: " + this.position2 );
    this.position3 = this.d$.dsPosition[this.data.member.position3];
    this.lg$.log("position3 set to: " + this.position3 );

    this.lg$.log("Team value is: " + this.data.member.team );
    this.lg$.log("Team2 value is: " + this.data.member.team2 );
    this.lg$.log("Team3 value is: " + this.data.member.team3 );
    this.lg$.log("Position value is: " + this.data.member.position );
    this.lg$.log("Position2 value is: " + this.data.member.position2 );
    this.lg$.log("Position3 value is: " + this.data.member.position3 );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCloseConfirm() {
    this.lg$.trace("-> onCloseConfirm()");
    this.logdepth  += 2;
    this.logPrefix  = this.com$.getLogDepth(this.logdepth);
    /* Restore the numeric value of the team from the name */
    this.data.member.team      = this.getTeamFromName( this.team );
    this.data.member.team2     = this.getTeamFromName( this.team2 );
    this.data.member.team3     = this.getTeamFromName( this.team3 );
    this.data.member.position  = this.getPositionFromName(this.position);
    this.data.member.position2 = this.getPositionFromName(this.position2);
    this.data.member.position3 = this.getPositionFromName(this.position3);
    // TODO: save the updated member data
    this.mbr$.saveMember( this.data.member );

    this.lg$.log(this.logPrefix + "Member name: " + this.data.member.name );
    this.lg$.log(this.logPrefix + "Address    : " + this.data.member.address );
    this.lg$.log(this.logPrefix + "Phone      : " + this.data.member.phone );
    this.lg$.log(this.logPrefix + "Phone2     : " + this.data.member.phone2 );
    this.lg$.log(this.logPrefix + "email      : " + this.data.member.email );
    this.lg$.log(this.logPrefix + "DOB        : " + this.data.member.dob );
    this.lg$.log(this.logPrefix + "team       : " + this.data.member.team);
    this.lg$.log(this.logPrefix + "team2      : " + this.data.member.team2);
    this.lg$.log(this.logPrefix + "team3      : " + this.data.member.team3);
    this.lg$.log(this.logPrefix + "academyinfo: " + this.data.member.academyinfo );
    this.lg$.log(this.logPrefix + "position   : " + this.data.member.position );
    this.lg$.log(this.logPrefix + "position2  : " + this.data.member.position2 );
    this.lg$.log(this.logPrefix + "position3  : " + this.data.member.position3 );
    this.dialogRef.close('Confirm');
    this.logdepth -= 2;
    this.lg$.trace("<- onCloseConfirm()");
  }
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

  getTeamFromName( team: string )
  {
    if( team === "None" )
      return 0;
    else
      return (this.d$.dsTeams.find( this.checkName( team ) ).id);

  }

  getPositionFromName( pos: string )
  {
    return (this.d$.dsPosition.indexOf( pos ) );
  }

  checkName(txt)
  {
    return function( currentValue:Team )
    {
      console.log("Converting team: " + txt + ", value: " + currentValue.name );
      if( currentValue.name === txt )
        return true;
      else
        return false;
    }
  }

  buildTeamDropDown()
  {
    this.logdepth  += 2;
    this.logPrefix  = this.com$.getLogDepth(this.logdepth);
    this.lg$.trace("-> buildTeamDropDown()");
    // setup up the drop-down to select a team
    this.options = new Array<string>();
    this.options.push("None"); // 1st option is no team
    for( let team of this.d$.dsTeams )
    {
      this.lg$.trace("Pushing: " + team.name);
      this.options.push( team.name );
    }
    this.lg$.trace("Options has [" + this.options.length + "] elements");
    this.lg$.trace("<- buildTeamDropDown()");
    this.logdepth -= 2;
  }

}
