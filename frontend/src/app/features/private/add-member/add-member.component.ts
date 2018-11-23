import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoggerService } from '../../../services/logger.service';
import { CommonService } from './../../../services/common.service';
import { SessionDataService } from '../../../services/session-data.service';
import { MemberService } from '../../../services/member.service';
import { DateUtilsService } from '../../../services/date-utils.service';

import { Member } from '../../../model/member';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css'],
  providers: [ LoggerService ]
})
export class AddMemberComponent implements OnInit {
  componentName = 'AddMemberComponent';
  logdepth = 2;
  myControl: FormControl;
  options: string[];
  xdob: Date;
  team: string;
  team2: string;
  team3: string;
  position: string;
  position2: string;
  position3: string;
  startDate: Date;

  constructor( private lg$: LoggerService,
               private com$: CommonService,
               public d$: SessionDataService,
               private mbr$: MemberService,
               private date$: DateUtilsService,
               public dialogRef: MatDialogRef<AddMemberComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any ) 
  { 
    this.lg$.setLogHdr(this.logdepth, this.componentName);
  }

  ngOnInit() {
    this.myControl = new FormControl();
    this.startDate = new Date();
    
    // setup up the drop-down to select a team
    this.options = new Array<string>();
    this.options.push("None"); // 1st option is no team
    for( let team of this.d$.dsTeams )
    {
      this.lg$.trace("Pushing: " + team.name);
      this.options.push( team.name );
    }
    this.lg$.trace("Options has [" + this.options.length + "] elements");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCloseConfirm() {
    this.data.member.dob =  this.date$.toDateStr( this.xdob );
    this.data.member.team = this.convertTeam( this.team );
    this.data.member.team2 = this.convertTeam( this.team2 );
    this.data.member.team3 = this.convertTeam( this.team3 );
    this.data.member.position = this.convertPosition( this.position );
    this.data.member.position2 = this.convertPosition( this.position2 );
    this.data.member.position3 = this.convertPosition( this.position3 );
    if( this.data.member.amount > 0 )
      this.data.member.paydate = this.date$.toDateStr( new Date() );
    else
      this.data.member.paydate = '1900-01-01';

    // Save the new member data
    this.mbr$.addMember( this.data.member, this.applyMemberAdd );

    this.lg$.log("Member name: " + this.data.member.name );
    this.lg$.log("Address    : " + this.data.member.address );
    this.lg$.log("Phone      : " + this.data.member.phone );
    this.lg$.log("Phone2     : " + this.data.member.phone2 );
    this.lg$.log("email      : " + this.data.member.email );
    this.lg$.log("DOB        : " + this.data.member.dob );
    this.lg$.log("team       : " + this.data.member.team);
    this.lg$.log("team2      : " + this.data.member.team2);
    this.lg$.log("team3      : " + this.data.member.team3);
    this.lg$.log("academyinfo: " + this.data.member.academyinfo );
    this.lg$.log("position   : " + this.data.member.position );
    this.lg$.log("position2  : " + this.data.member.position2 );
    this.lg$.log("position3  : " + this.data.member.position3 );
    this.dialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

   /**********************************************************
   * Name       : applyMemberAdd()
   * Description: Applies a change to the local data so the
   *              user sees the change on the view.
   * Scope    : Internal
   * Params in: None
   * Return   : 
   **********************************************************/
  public applyMemberAdd( allMembers: Array<Member>, member: Member, teams: Array<any>, lg$: LoggerService, mbr$: MemberService )
	{
      lg$.log("-> applyMemberAdd("+member+")");

      // Dates are in the wrong format of yyyy-mm-dd and we need it in dd-mm-yyyy to display
      // So, we need to reverse the format before adding the member to the lists
      let parts: string [] = member.dob.split("-", 3);
      member.dob = parts[2] + "-" + parts[1] + "-" + parts[0];
      parts = member.paydate.split("-", 3);
      member.paydate = parts[2] + "-" + parts[1] + "-" + parts[0];

      lg$.log("Adding member from list..");
      allMembers.push(member);

      if( member.team > 0 )
        teams[member.team].push(member);	
	}

  convertDate( dob: Date )
  {
    let day:number = dob.getUTCDate()+1;
    let month:number = dob.getUTCMonth()+1;
    let year:number = dob.getUTCFullYear();

    let birthday = (day < 10 ? ("0"+day) : day) + "/" + (month < 10 ? ("0"+month) : month ) + "/" +  year;
    this.lg$.log("The date built is: " + birthday );
    this.lg$.log("The day is: " + day );
    this.lg$.log("The month is: " + month );

    return birthday;
  }

  convertTeam( t: string )
  {
    for( let oTeam of this.d$.dsTeams )
    {
      if( oTeam.name === t )
      {
        this.lg$.trace("Team id is: " + oTeam.id);
        return oTeam.id;
      }
      
    }
  }

  convertPosition( p: string )
  {
    let i: number = 0;

    for( let sPos of this.d$.dsPosition )
    {
      if( p === sPos )
      {
        this.lg$.trace("Position id is: " + i);
        return i;
      }
      i++;
    }
  }

}
