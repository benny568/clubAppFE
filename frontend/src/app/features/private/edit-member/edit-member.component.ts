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
    this.dialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

}
