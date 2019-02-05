import { Component, OnInit, Inject } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';

import { EditMyProfileComponent } from '../edit-my-profile/edit-my-profile.component';

import { LoggerService }     from '../../../services/logger.service';
import { UserService }       from '../../../services/user.service';
import { ErrorService }      from '../../../services/error.service';

import { User }               from '../../../model/site-user';

@Component({
  selector: 'app-admin-my-profile',
  templateUrl: './admin-my-profile.component.html',
  styleUrls: ['./admin-my-profile.component.css'],
  providers  : [ LoggerService ]
})
export class AdminMyProfileComponent implements OnInit {

  componentName = 'AdminMyProfileComponent';
  logdepth      = 3;
  dialogRef: MatDialogRef<EditMyProfileComponent>;

  constructor( private lg$   : LoggerService,
               public  user$ : UserService,
               private err$  : ErrorService,
               private dialog: MatDialog  ) 
  {
    this.lg$.setLogHdr(this.logdepth, this.componentName);
  }

  ngOnInit() {
    this.user$.getUser( this.user$.CurrentUser.name ).subscribe(
      results => {
        if( !results )
            return;
        this.lg$.trace("Got user from db");
        this.user$.CurrentUser = results;
        this.lg$.trace("Logged in user is: " + this.user$.CurrentUser.name );
        this.lg$.trace("Address: " + this.user$.CurrentUser.address );
        this.lg$.trace("Phone: " + this.user$.CurrentUser.phone );
      },      
      (error: Response) => this.err$.handleError(error)); // this.err$.snackBar.open( "You do not have permissions to perform this action!", 'Error', { duration: this.err$.msgDuration } ));
    }

  /**********************************************************
   * Name:		editProfile()
   * Description:	Edit my profile
   * Scope:		Internal
   * Params in:	None
   * Return:
   **********************************************************/
  public editProfile()
  {
    this.lg$.log("    |-> editProfile(" + this.user$.CurrentUser.name + ")");

    this.openDialog();

  }

  openDialog(): void
  {
    console.log("Opening dialog, passing user to component [" + this.user$.CurrentUser.name + "]");
    this.dialogRef = this.dialog.open(EditMyProfileComponent, {
      //width: '500px',
      //hasBackdrop: true
      data: { user: this.user$.CurrentUser }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
