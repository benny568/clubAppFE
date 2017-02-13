import { Component }          from '@angular/core';
import { SessionDataService } from '../services/session-data.service';
import { LoggerService }      from '../services/logger.service';

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
							<div class="col-md-10 teamHdr" *ngIf="!showArray[team.id]"><span class="glyphicon glyphicon-triangle-bottom" (click)="getMembers4team(team.id)" style="cursor:pointer;"></span> {{team.name}}</div>
							<div class="col-md-10 teamHdr" *ngIf="showArray[team.id]"><span class="glyphicon glyphicon-triangle-top" (click)="toggleView(team.id)" style="cursor:pointer;"></span> {{team.name}}</div>
							<div  style="float:right; align:bottom;">
								<button type="button" class="btn btn-warning btn-xs" (click)="addMember(team.id)" style="cursor:pointer;" data-toggle="tooltip" data-placement="right">Add Member</button>
							</div>
						</div>
			    		<div class="panel-body avenue-body" style="height:100%;">
							<div *ngIf="showArray[team.id]">
								<div class="row">
								    <div class="col-md-3 tblHdr">Name</div>
								    <div class="col-md-5 tblHdr">Address</div>
								    <div class="col-md-2 tblHdr">Phone</div>
								    <div class="col-md-2 tblHdr">Operations</div>
								</div> <!-- end of row -->
								<div *ngFor="let member of d$.dsTeamMembers[team.id]" class="row light-line">							    
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
	showArray = [];
	
	constructor( private lg$: LoggerService, 
				 public d$: SessionDataService ) 
	{
		this.lg$.setLogHdr(this.logdepth, this.component);
	}
	
	ngOnInit() {
		this.lg$.log("-> ngOnInit()");
		
		// (1) Read in the teams
		//this.d$.dsGetTeams();
		
		for ( var i = 0; i < this.showArray.length; i++ )
		{
			this.showArray[i] = false;
		}
		
		this.lg$.log("<- ngOnInit()");
	}
	
	getMembers4team(iTeam) {
		this.lg$.log("-> getMembers4team(" + iTeam + ")");
		var self = this;
				
		this.d$.loadCurrentTeamMembersByName( this.d$.getTeamNameFrmId(iTeam, (this.logdepth + 1)),
											  function(data) {
												console.log("****** MY CALLBACK *******");
												self.d$.dsTeamMembers[iTeam] = data;
												self.showArray[iTeam] = true;
											});
		this.showArray[iTeam] = true;
		this.lg$.log("<- getMembers4team(): " + this.showArray[iTeam]);
	}
	
	toggleView(iTeam) {
		this.lg$.log("-> toggleView(" + iTeam + ")");
		
		this.showArray[iTeam] = !this.showArray[iTeam];
		this.lg$.log("    |- showArray value: " + this.showArray[iTeam] );
		 
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
		
		this.d$.editMember( member );
		 
		this.lg$.log("<- editMember()");
	}
	
	deleteMember(member)
	{
		this.lg$.log("-> deleteMember()");
		
		this.d$.deleteMember( member );
		 
		this.lg$.log("<- deleteMember()");
	}
}