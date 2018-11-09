import { Component, OnInit } from '@angular/core';
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
  selector: 'app-admin-all-members',
  templateUrl: './admin-all-members.component.html',
  styleUrls: ['./admin-all-members.component.css'],
  providers: [ LoggerService ]
})
export class AdminAllMembersComponent implements OnInit {
  season: String;
  componentName = 'AdminAllMembersComponent';
  logdepth = 0;
  loggedIn = '';
  thisMember: Member;
  dialogRef: MatDialogRef<EditMemberComponent>;
  addDialogRef: MatDialogRef<AddMemberComponent>;
  delDialogRef: MatDialogRef<DeleteMemberComponent>;

  constructor(  private lg$: LoggerService,
                private com$: CommonService,
                public d$: SessionDataService,
                public mbr$: MemberService,
                private dialog: MatDialog )
    {
      this.lg$.setLogHdr(this.logdepth, this.componentName);
    }

  ngOnInit() {
    this.season = this.com$.calculateCurrentSeason();
    this.mbr$.getAllMembers( this.gotMembers( this.lg$, this.mbr$ ) );
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
  gotMembers( logger: LoggerService, memberService: MemberService  )
  {
    return function()
    {
      logger.log("-> gotMembers()");
      logger.log("   Loaded " + memberService.msAllMembers.length + " members.");
      logger.log("<-----|");
    }
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
      });
    }

}
