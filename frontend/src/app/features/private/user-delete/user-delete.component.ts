import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoggerService } from '../../../services/logger.service';
import { CommonService } from './../../../services/common.service';
import { SessionDataService } from '../../../services/session-data.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model';

@Component({
  selector   : 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls  : ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  componentName = 'AddMemberComponent';
  logdepth      = 2;
  myControl: FormControl;
  user     : User;

  constructor( private lg$: LoggerService,
               private com$                        : CommonService,
               public  d$                          : SessionDataService,
               private usr$                        : UserService,
               public  dialogRef                   : MatDialogRef<UserDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any )
  {
    this.lg$.setLogHdr(this.logdepth, this.componentName);
  }

  ngOnInit()
  {
    this.myControl = new FormControl();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCloseConfirm() {
    this.usr$.deleteUser( this.user, null );
    this.dialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

}
