import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoggerService } from '../../../services/logger.service';
import { UserService }       from '../../../services/user.service';
import { DateUtilsService } from '../../../services/date-utils.service';

@Component({
  selector: 'app-edit-my-profile',
  templateUrl: './edit-my-profile.component.html',
  styleUrls: ['./edit-my-profile.component.css'],
  providers  : [ LoggerService ]
})
export class EditMyProfileComponent implements OnInit {
  componentName: string   = 'EditMyProfileComponent';
  logdepth     : number   = 3;
  logPrefix    : string   = '';
  myControl    : FormControl;
  options      : string[];
  xdob         : Date;
  Statuses     : string[];
  accStatus    : string;
  startDate    : Date = new Date();

  constructor( private lg$     : LoggerService,
               private user$   : UserService,
               public date$    : DateUtilsService,
               public dialogRef: MatDialogRef<EditMyProfileComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any ) 
  {
    this.lg$.setLogHdr(this.logdepth, this.componentName);
  }

  ngOnInit() {
    this.myControl = new FormControl();

    // setup up the drop-down to select a role
    this.options = new Array<string>();
    this.options.push("None"); // 1st option is no role
    for( let role of this.user$.roles )
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
    this.xdob = new Date( this.date$.convertStringToDate( this.data.user.dob, "dd/mm/yyyy", "-") );
    this.lg$.trace("Transformed date: " + this.xdob );

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
    this.lg$.trace("-> onCloseConfirm(" + this.xdob + ")");
    this.data.user.dob = this.date$.convertDateToString( this.xdob );
    this.lg$.trace("onCloseConfirm - this.data.user.dob=" + this.data.user.dob);
    this.data.user.enabled = this.accStatus === 'Enabled' ? true : false;
    this.user$.logUser( this.data.user );
    this.user$.updateUser( this.data.user, null );
    this.dialogRef.close('Confirm');
  }
  
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

  updateCallback(): void
  {
    return; // Does nothing
  }
}
