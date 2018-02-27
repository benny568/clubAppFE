import { Component, OnInit, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoggerService } from '../../../services/logger.service';
import { CommonService } from './../../../services/common.service';
import { SessionDataService } from '../../../services/session-data.service';
import { MemberService } from '../../../services/member.service';

import { Member } from './../../../model/member';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css'],
  providers: [ LoggerService ]
})
export class EditMemberComponent implements OnInit {
  componentName = 'EditMemberComponent';
  logdepth = 2;
  startDate = new Date();

  constructor( private lg$: LoggerService,
               private com$: CommonService,
               public d$: SessionDataService,
               private mbr$: MemberService,
               public dialogRef: MatDialogRef<EditMemberComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any ) 
  { 
    this.lg$.setLogHdr(this.logdepth, this.componentName);
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCloseConfirm() {
    this.lg$.log("Member name: " + this.data.member.name );
    this.lg$.log("Address    : " + this.data.member.address );
    this.lg$.log("Phone      : " + this.data.member.phone );
    this.lg$.log("Phone2     : " + this.data.member.phone2 );
    this.lg$.log("email      : " + this.data.member.email );
    this.lg$.log("DOB        : " + this.data.member.dob );
    this.dialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

}
