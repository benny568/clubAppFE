import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoggerService } from '../../../services/logger.service';
import { CommonService } from './../../../services/common.service';
import { SessionDataService } from '../../../services/session-data.service';
import { UserService } from '../../../services/user.service';
import { DateUtilsService } from '../../../services/date-utils.service';

import { User } from '../../../model/site-user';

@Component({
  selector   : 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls  : ['./user-edit.component.css'],
  providers  : [ LoggerService ]
})
export class UserEditComponent implements OnInit {
  componentName: string   = 'UserEditComponent';
  logdepth     : number   = 2;
  logPrefix    : string   = '';
  startDate    : Date = new Date();
  myControl    : FormControl;
  options      : string[];
  xdob         : Date;
  Statuses     : string[];
  accStatus    : string;

  constructor( private lg$                         : LoggerService,
               private com$                        : CommonService,
               public  d$                          : SessionDataService,
               private usr$                        : UserService,
               private date$                       : DateUtilsService,
               public  dialogRef                   : MatDialogRef<UserEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any )
  {
    this.lg$.setLogHdr(this.logdepth, this.componentName);
  }

  ngOnInit() {
    this.myControl = new FormControl();

    // setup up the drop-down to select a role
    this.options = new Array<string>();
    this.options.push("None"); // 1st option is no role
    for( let role of this.usr$.roles )
    {
      //this.lg$.trace("Pushing: " + role);
      this.options.push( role );
    }
    //this.lg$.trace("Options has [" + this.options.length + "] elements");

    this.Statuses = new Array<string>();
    this.Statuses.push("Disabled");
    this.Statuses.push("Enabled");

    // Convert the date
    this.lg$.trace("DOB beforehand: " + this.data.user.dob == null ? '' :this.data.user.dob);
    this.lg$.trace("Transformed date: " + this.parseDate(this.data.user.dob));
    this.xdob = new Date(this.parseDate(this.data.user.dob == null ? '' :this.data.user.dob));

    // Role
    this.lg$.trace("User role currently set to: " + this.data.user.role == null ? '' :this.data.user.role );

    // Account status
    this.accStatus = this.data.user.enabled === true ? "Enabled" : "Disabled";
    this.lg$.trace("User status is: " + this.accStatus );

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCloseConfirm() {
    this.data.user.dob = this.date$.convertDateToString( this.xdob );
    this.lg$.trace("onCloseConfirm - this.data.user.dob=" + this.data.user.dob);
    this.data.user.enabled = this.accStatus === 'Enabled' ? true : false;
    this.usr$.logUser( this.data.user );
    this.usr$.updateUser( this.data.user, null );
    this.dialogRef.close('Confirm');
  }

  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

  private parseDate(dbDate: string): string
  {
    if( dbDate != null && dbDate != '' )
    {
      let dateParts = dbDate.split("/");
      // for( let i=0; i<dateParts.length; i++ )
      //   this.lg$.trace("Date part [" + i + "] + " + dateParts[i]);
      return dateParts[1] + "-" + dateParts[0]+ "-" + dateParts[2];
    }
    else
      return '1-1-1900';
  }

}
