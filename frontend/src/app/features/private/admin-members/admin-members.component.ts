import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoggerService } from '../../../services/logger.service';
import { CommonService } from './../../../services/common.service';
import { SessionDataService } from '../../../services/session-data.service';
import { MemberService } from '../../../services/member.service';

import { AddMemberComponent } from './../add-member/add-member.component';
import { EditMemberComponent } from '../edit-member/edit-member.component';
import { DeleteMemberComponent } from './../delete-member/delete-member.component';

import { Member } from './../../../model/member';

@Component({
  selector: 'app-admin-members',
  templateUrl: './admin-members.component.html',
  styleUrls: ['./admin-members.component.css'],
  providers: [ LoggerService ]
})
export class AdminMembersComponent implements OnInit {

  componentName = 'AdminMembersComponent';
  logdepth = 0;
  loggedIn = '';
  showArray: boolean[];
  date =  new Date();
  thisMember: Member;
  dialogRef: MatDialogRef<EditMemberComponent>;
  addDialogRef: MatDialogRef<AddMemberComponent>;
  delDialogRef: MatDialogRef<DeleteMemberComponent>;

  constructor( private lg$: LoggerService,
               private com$: CommonService,
               public d$: SessionDataService,
               public mbr$: MemberService,
               private router : Router,
               private dialog: MatDialog )
  {
    this.lg$.setLogHdr(this.logdepth, this.componentName);
  }

  ngOnInit() {
    this.showArray = new Array<boolean>();
  }

  toggleView( team: number )
  {
    this.lg$.log("-> toggleView(" + team + ")");
    this.showArray[team] = !this.showArray[team];
    this.lg$.log("      |- display for team " + team + " set to [" + this.showArray[team] + "]");
    this.lg$.log("<-----|");
  }

  allMembersAdmin()
  {
    this.lg$.log("-> allMembersAdmin()");
    this.router.navigate(['/adminAllMembers']);
  }

  getMembers4team( team: number )
  {
      this.lg$.log("    --> getMembers4team(" + team + ")");
      this.mbr$.loadCurrentTeamMembersByTeamId( team, this.gotTeamMembers(this.lg$, this.showArray) );
  }

  /**********************************************************
   * Name:		gotTeamMembers()
   * Description:	Sets up a callback using closures so that
   *              the display array can be toggled when the
   *              team members are loaded.
   * Scope:		Internal
   * Params in:	logger - the logger service for the component
   *            array  - the showArray
   * Return: A function to be used as a callback when the
   *         team members are returned from the server.
   **********************************************************/
  gotTeamMembers( logger: LoggerService, array )
  {
    return function( team: number )
    {
      logger.log("-> gotTeamMembers(" + team + ")");
      array[team] = !array[team];
      logger.log("      |- display for team " + team + " set to [" + array[team] + "]");
      logger.log("<-----|");
    }
  }

  /**********************************************************
     * Name:		addMember()
     * Description:	Present a form to add a new member
     * Scope:		Internal
     * Params in:	None
     * Return:
     **********************************************************/
    addMember( team: number )
    {
      this.lg$.log("    |-> addMember(" + team + ")");
      this.thisMember = new Member();

      this.openAddDialog();

    }

  /**********************************************************
     * Name:		editMember()
     * Description:	Edit the current selected member
     * Scope:		Internal
     * Params in:	None
     * Return:
     **********************************************************/
    editMember( member: Member )
    {
      this.lg$.log("    |-> editMember(" + member.name + ")");
      this.thisMember = member;

      this.openDialog();

    }

    /**********************************************************
     * Name:		deleteMember()
     * Description:	Delete the current selected member
     * Scope:		Internal
     * Params in:	None
     * Return:
     **********************************************************/
    deleteMember( member: Member )
    {

      this.lg$.log("    |-> deleteMember(" + member.name + ")");
      this.thisMember = member;

      this.openDelDialog();
    }

    openDelDialog(): void
    {
      this.delDialogRef = this.dialog.open(DeleteMemberComponent, {
        //width: '500px',
        //hasBackdrop: true,
        data: { member: this.thisMember }
      });

      this.delDialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

    openAddDialog(): void
    {
      this.addDialogRef = this.dialog.open(AddMemberComponent, {
        //width: '500px',
        //hasBackdrop: true,
        data: { member: this.thisMember }
      });

      this.addDialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

    openDialog(): void
    {
      this.dialogRef = this.dialog.open(EditMemberComponent, {
        //width: '500px',
        //hasBackdrop: true,
        data: { member: this.thisMember }
      });

      this.dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        //this.animal = result;
      });
    }

}
