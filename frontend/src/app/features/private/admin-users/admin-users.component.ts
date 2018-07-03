import { UserEditComponent } from './../user-edit/user-edit.component';
import { UserDeleteComponent } from './../user-delete/user-delete.component';
import { AddUserComponent } from './../add-user/add-user.component';
import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoggerService } from '../../../services/logger.service';
import { CommonService } from './../../../services/common.service';
import { SessionDataService } from '../../../services/session-data.service';
import { UserService } from '../../../services/user.service';

import { User } from '../../../model/site-user';

@Component({
  selector   : 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls  : ['./admin-users.component.css']
})

export class AdminUsersComponent implements OnInit {
  componentName = 'AdminUsersComponent';
  logdepth      = 0;
  user        : User;
  dialogRef   : MatDialogRef<UserEditComponent>;
  addDialogRef: MatDialogRef<AddUserComponent>;
  delDialogRef: MatDialogRef<UserDeleteComponent>;

  constructor(  private lg$   : LoggerService,
                private com$  : CommonService,
                public  d$    : SessionDataService,
                public  usr$  : UserService,
                private dialog: MatDialog )
  {
    this.lg$.setLogHdr(this.logdepth, this.componentName);
  }

  ngOnInit() {
    this.usr$.getAllUsers();
    this.user = new User();
  }

  /**********************************************************
   * Name       : addUser()
   * Description: Present a form to add a new user
   * Scope      : Internal
   * Params in  : None
   * Return     : 
   **********************************************************/
  public addUser()
  {
    this.lg$.log("addUser()");
    this.openAddDialog();
  }

    /**********************************************************
     * Name       : editUser()
     * Description: Edit the current selected member
     * Scope      : Internal
     * Params in  : None
     * Return     : 
     **********************************************************/
    editUser( user: User )
    {
      this.lg$.log("    |-> editUser(" + user.name + ")");
      this.user = user;

      this.openEditDialog();

    }

    /**********************************************************
     * Name       : deleteMember()
     * Description: Delete the current selected member
     * Scope      : Internal
     * Params in  : None
     * Return     : 
     **********************************************************/
    deleteMember( user: User )
    {

      this.lg$.log("    |-> deleteMember(" + user.name + ")");
      this.user = user;

      this.openDelDialog();
    }

    openEditDialog(): void
    {
      this.dialogRef = this.dialog.open(UserEditComponent, {
        //width: '500px',
        //hasBackdrop: true,
        data: { user: this.user }
      });

      this.dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

  openAddDialog(): void
    {
      this.addDialogRef = this.dialog.open(AddUserComponent, {
        data: { user: this.user }
      });

      this.addDialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

    openDelDialog(): void
    {
      this.delDialogRef = this.dialog.open(UserDeleteComponent, {
        data: { user: this.user }
      });

      this.delDialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

}
