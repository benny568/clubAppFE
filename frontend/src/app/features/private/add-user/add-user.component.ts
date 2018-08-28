import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoggerService } from '../../../services/logger.service';
import { CommonService } from './../../../services/common.service';
import { SessionDataService } from '../../../services/session-data.service';
import { UserService } from '../../../services/user.service';

import { User } from '../../../model/site-user';

@Component({
  selector   : 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls  : ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  componentName = 'AddUserComponent';
  logdepth      = 2;
  myControl: FormControl;
  options  : string[];
  startDate: Date;
  xdob     : Date;


  constructor( private lg$: LoggerService,
               private com$                        : CommonService,
               public  d$                          : SessionDataService,
               private usr$                        : UserService,
               public  dialogRef                   : MatDialogRef<AddUserComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any )
  {
    this.lg$.setLogHdr(this.logdepth, this.componentName);
  }

  ngOnInit() {
    this.myControl = new FormControl();
    this.startDate = new Date();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCloseConfirm() {
    //this.usr$.addUser( this.data.user, null ).subscribe();
    this.dialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

}
