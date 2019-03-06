import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoggerService } from '../../../services/logger.service';
import { CommonService } from './../../../services/common.service';
import { SessionDataService } from '../../../services/session-data.service';
import { MemberService } from '../../../services/member.service';

import { Member } from './../../../model/member';


@Component({
  selector: 'app-delete-member',
  templateUrl: './delete-member.component.html',
  styleUrls: ['./delete-member.component.css'],
  providers: [ LoggerService ]
})

export class DeleteMemberComponent implements OnInit {

  componentName = 'AddMemberComponent';
  logdepth = 2;
  myControl: FormControl;

  constructor( private lg$: LoggerService,
               private com$: CommonService,
               public d$: SessionDataService,
               private mbr$: MemberService,
               public dialogRef: MatDialogRef<DeleteMemberComponent>,
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
    this.mbr$.deleteMember( this.data.member, this.data.callback, this.data.dataSource, this.data.paginator );
    this.dialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

  /**********************************************************
   * Name       : applyMemberDel()
   * Description: Applies a change to the local data so the
   *              user sees the change on the view.
   * Scope    : Internal
   * Params in: None
   * Return   : 
   **********************************************************/
  public applyMemberDel( allMembers: Array<Member>, member: Member, teams: Array<any>, lg$: LoggerService, mbr$: MemberService )
	{
      lg$.log("-> applyMemberDel("+member+")");

  		var index:number = mbr$.findMemberIndexFromTeam( allMembers, member.id );

  		if ( index === -1 )
  		{
  			return;
  		} else if ( index > -1 )
  		{   // Delete the member at index
          lg$.log("Removing member from list..");
          allMembers.splice( index, 1 );

          if( member.team > 0 )
          {
            index = mbr$.findMemberIndexFromTeam( teams[member.team], member.id );
            if ( index > -1 )
            {
              lg$.log("Team index found: " + index);
              teams[member.team].splice( index, 1 );
            }              
          }
          if( member.team2 > 0 )
          {
            index = mbr$.findMemberIndexFromTeam( teams[member.team], member.id );
            if ( index > -1 )
            {
              lg$.log("Team2 index found: " + index);
              teams[member.team2].splice( index, 1 );
            }              
          }
          if( member.team3 > 0 )
          {
            index = mbr$.findMemberIndexFromTeam( teams[member.team], member.id );
            if ( index > -1 )
            {
              lg$.log("Team3 index found: " + index);
              teams[member.team3].splice( index, 1 );
            }              
          }
          
  		}
  }

}
