import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoggerService } from '../../../services/logger.service';
import { CommonService } from './../../../services/common.service';
import { SessionDataService } from '../../../services/session-data.service';
import { MemberService } from '../../../services/member.service';

import { Member } from './../../../model/member';

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

  constructor( private lg$: LoggerService,
    private com$: CommonService,
    public d$: SessionDataService,
    private mbr$: MemberService,
    public dialogRef: MatDialogRef<AddMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) 
  { 
    this.lg$.setLogHdr(this.logdepth, this.componentName);
  }

  ngOnInit() {
    this.myControl = new FormControl();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCloseConfirm() {
    /* Restore the numeric value of the team from the name */
    // this.data.member.team = this.getTeamFromName( this.team );
    // this.data.member.team2 = this.getTeamFromName( this.team2 );
    // this.data.member.team3 = this.getTeamFromName( this.team3 );
    // this.data.member.position = this.getPositionFromName(this.position);
    // this.data.member.position2 = this.getPositionFromName(this.position2);
    // this.data.member.position3 = this.getPositionFromName(this.position3);
    // TODO: save the updated member data
    this.mbr$.saveMember( this.data.member );

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

}
