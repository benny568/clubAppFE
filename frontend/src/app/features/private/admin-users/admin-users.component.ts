import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';

import { UserEditComponent } from './../user-edit/user-edit.component';
import { UserDeleteComponent } from './../user-delete/user-delete.component';
import { AddUserComponent } from './../add-user/add-user.component';

import { LoggerService } from '../../../services/logger.service';
import { SessionDataService } from '../../../services/session-data.service';
import { UserService } from '../../../services/user.service';
import { ErrorService } from '../../../services/error.service';

import { User } from '../../../model/site-user';

@Component({
  selector   : 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls  : ['./admin-users.component.css'],
  providers  : [ LoggerService ]
})

export class AdminUsersComponent implements OnInit {
  componentName = 'AdminUsersComponent';
  logdepth      = 0;
  user        : User;
  dialogRef   : MatDialogRef<UserEditComponent>;
  addDialogRef: MatDialogRef<AddUserComponent>;
  delDialogRef: MatDialogRef<UserDeleteComponent>;
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'name', 'address', 'email', 'phone', 'operations'];

  constructor(  private lg$   : LoggerService,
                private err$  : ErrorService,
                public  d$    : SessionDataService,
                public  usr$  : UserService,
                private dialog: MatDialog )
  {
    this.lg$.setLogHdr(this.logdepth, this.componentName);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.usr$.getAllUsers('', 'asc', 0, 5).subscribe( results => {
      if( !results )
          return;
      this.lg$.trace("Got users from db, setting up table..");
      this.dataSource = new MatTableDataSource(results);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.usr$.allUsers = results;
    },
    (error: Response) => this.err$.handleError(error)); // err => this.err$.snackBar.open( "You do not have permissions to perform this action!", 'Error', { duration: this.err$.msgDuration } ));

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
    this.user = new User();
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

      console.log("calling openEditDialog()...");

      this.openEditDialog();

    }

    /**********************************************************
     * Name       : deleteUser()
     * Description: Delete the current selected user
     * Scope      : Internal
     * Params in  : None
     * Return     :
     **********************************************************/
    deleteUser( user: User )
    {

      this.lg$.log("    |-> deleteUser(" + user.name + ")");
      this.user = user;

      this.openDelDialog();
    }

    openEditDialog(): void
    {
      console.log("In openEditDialog() .... user is: " + this.user.name);
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
        data: { user: this.user, dataSource: this.dataSource, paginator: this.paginator }
      });

      this.addDialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

    openDelDialog(): void
    {
      this.delDialogRef = this.dialog.open(UserDeleteComponent, {
        data: { user: this.user, paginator: this.paginator, dataSource: this.dataSource }
      });

      this.delDialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

}
