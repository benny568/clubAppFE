import { Component }          from '@angular/core';
import { Router }             from '@angular/router';

import { SessionDataService } from '../services/session-data.service';
import { LoggerService }      from '../services/logger.service';
import { MemberService }      from '../services/member.service';

@Component({
	template: `
<div class="container">
	<div style="margin-left:auto;margin-right:auto;width:80%;">
			<div class="row">
				<div class="col-md-10">
					<h3>Club Register 2016 Season</h3>
				</div>
				<div class="col-md-2">
					<div  style="float:right; align:bottom;">
						<button type="button" class="btn btn-warning btn-xs" (click)="allMembersAdmin" style="cursor:pointer;" data-toggle="tooltip" data-placement="right">All Members</button>
					</div>
				</div>
			</div>
			<div class="row">
				<div *ngFor="let team of d$.dsTeams">
					<div class="panel">
						<div class="panel-heading avenue-heading" style="min-height:35px;">
							<div class="col-md-10 teamHdr" *ngIf="!d$.showTeamArray[team.id]"><span class="glyphicon glyphicon-triangle-bottom" (click)="getMembers4team(team.id)" style="cursor:pointer;"></span> {{team.name}}</div>
							<div class="col-md-10 teamHdr" *ngIf="d$.showTeamArray[team.id]"><span class="glyphicon glyphicon-triangle-top" (click)="toggleView(team.id)" style="cursor:pointer;"></span> {{team.name}}</div>
							<div  style="float:right; align:bottom;">
								<button type="button" class="btn btn-warning btn-xs" (click)="addMember(team.id)" style="cursor:pointer;" data-toggle="tooltip" data-placement="right">Add Member</button>
							</div>
						</div>
			    		<div class="panel-body avenue-body" style="height:100%;">
							<div *ngIf="d$.showTeamArray[team.id]">
								<div class="row">
								    <div class="col-md-3 tblHdr">Name</div>
								    <div class="col-md-5 tblHdr">Address</div>
								    <div class="col-md-2 tblHdr">Phone</div>
								    <div class="col-md-2 tblHdr">Operations</div>
								</div> <!-- end of row -->
								<div *ngFor="let member of mem$.msTeamMembers[team.id]" class="row light-line">							    
						    		<div class="col-md-3">{{member.name}}</div>
									<div class="col-md-5">{{member.address}}</div>
									<div class="col-md-2">{{member.phone}}</div>
						    		<div class="col-md-2">

								    	<i (click)="editMember(member)" style="cursor:pointer;" data-toggle="tooltip" data-placement="right" title="Edit" class="glyphicon glyphicon-pencil" style="float:left;padding-left:10px;"> </i>&nbsp;
								    	<i (click)="deleteMember(member)" style="cursor:pointer;" data-toggle="tooltip" data-placement="right" title="Delete" class="glyphicon glyphicon-trash" style="float:left;padding-left:10px;"></i>
								    </div>	
							    </div> <!-- end row -->
							</div> <!-- end ng-show -->
						</div> <!-- end panel body -->
					</div> <!-- end of panel -->			
				</div> <!-- End of ng-repeat -->
			</div> <!-- end row -->
	</div>
</div> <!-- end of container -->
		`
})

export class AdminMembersComponent {
	component:string = 'AdminMembersComponent';
	logdepth:number = 0;
	
	constructor( private lg$: LoggerService, 
				 public d$: SessionDataService,
				 private mem$: MemberService,
				 private router$: Router ) 
	{
		this.lg$.setLogHdr(this.logdepth, this.component);
	}
	
	ngOnInit() {
		this.lg$.log("-> ngOnInit()");
		
		// (1) Read in the teams
		//this.d$.dsGetTeams();
		
		this.lg$.log("<- ngOnInit()");
	}
	
	getMembers4team(iTeam) {
		this.lg$.log("-> getMembers4team(" + iTeam + ")");
		var self = this;
		let team = iTeam;
				
		/*this.d$.loadCurrentTeamMembersByName( this.d$.getTeamNameFrmId(iTeam, (this.logdepth + 1)),*/
		this.mem$.loadCurrentTeamMembersByTeamId( iTeam,
											  function(data) {
												console.log("****** MY CALLBACK *******");
												self.mem$.msTeamMembers[iTeam] = data;
												self.d$.showTeamArray[team] = true;
											});
		self.d$.showTeamArray[iTeam] = true;
		for ( var i = 0; i < self.d$.showTeamArray.length; i++ )
		{
			self.d$.showTeamArray[i] = false;
		}
		self.d$.showTeamArray[iTeam] = true;
		this.lg$.log("<- getMembers4team(" + iTeam + "): " + self.d$.showTeamArray[iTeam]);
	}
	
	toggleView(iTeam) {
		this.lg$.log("-> toggleView(" + iTeam + ")");
		
		this.d$.showTeamArray[iTeam] = !this.d$.showTeamArray[iTeam];
		this.lg$.log("    |- showArray value: " + this.d$.showTeamArray[iTeam] );
		 
		this.lg$.log("<- toggleView()");
	}
	
	allMembersAdmin()
	{
		this.lg$.log("-> allMembersAdmin()");
				 
		this.lg$.log("<- allMembersAdmin()");
	}
	
	addMember(teamId)
	{
		this.lg$.log("-> addMember()");
		 
		this.lg$.log("<- addMember()");
	}
	
	editMember(member)
	{
		this.lg$.log("-> editMember()");
		
		// TBD: Input the member to the called component
		this.mem$.msCurrentMember = member;
		this.router$.navigate(['editMember', {}]);
		 
		this.lg$.log("<- editMember()");
	}
	
	deleteMember(member)
	{
		this.lg$.log("-> deleteMember()");
		
		this.mem$.deleteMember( member );
		 
		this.lg$.log("<- deleteMember()");
	}
}