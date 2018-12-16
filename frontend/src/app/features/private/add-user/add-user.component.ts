import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoggerService } from '../../../services/logger.service';
import { CommonService } from './../../../services/common.service';
import { SessionDataService } from '../../../services/session-data.service';
import { UserService } from '../../../services/user.service';
import { DateUtilsService } from '../../../services/date-utils.service';

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
  Statuses : string[];
  accStatus: string;


  constructor( private lg$: LoggerService,
               private com$                        : CommonService,
               public  d$                          : SessionDataService,
               private usr$                        : UserService,
               private date$                       : DateUtilsService,
               public  dialogRef                   : MatDialogRef<AddUserComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any )
  {
    this.lg$.setLogHdr(this.logdepth, this.componentName);
  }

  ngOnInit() {
    this.myControl = new FormControl();
    this.startDate = new Date();

     // setup up the drop-down to select a role
     this.options = new Array<string>();
     this.options.push("None"); // 1st option is no role
     for( let role of this.usr$.roles )
     {
       this.lg$.trace("Pushing: " + role);
       this.options.push( role );
     }
     this.lg$.trace("Options has [" + this.options.length + "] elements");

     this.Statuses = new Array<string>();
     this.Statuses.push("Disabled");
     this.Statuses.push("Enabled");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCloseConfirm() {
    this.data.user.dob = this.date$.convertDateToString( this.xdob );
    this.lg$.trace("onCloseConfirm - this.accStatus=" + this.accStatus);
    this.data.user.enabled = this.accStatus === 'Enabled' ? true : false;
    this.usr$.logUser( this.data.user );
    this.usr$.addUser( this.data.user, this.usr$.applyUserAdd, this.data.dataSource, this.data.paginator );
    this.dialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

}
