import { Component }     from '@angular/core';
import { Router    }     from '@angular/router';
import { FormBuilder,  
         FormGroup }     from '@angular/forms';

import { LoggerService } from '../../../services/logger.service';
import { CommonService } from '../../../services/common.service';
import { MemberService } from '../../../services/member.service';
import { SessionDataService } from '../../../services/session-data.service';

import { Member }        from '../../../model/member';
import { Position }      from '../../../model/position';

@Component({
    templateUrl: './editMember.component.html',
    styleUrls: ['./editMember.component.css']
})

export class EditMemberComponent {
    memberForm: FormGroup;
	member: Member;

    constructor( private lg$: LoggerService, 
				 private com$: CommonService,
				 public mem$: MemberService,
				 public d$: SessionDataService,
				 fb: FormBuilder ) 
    {
		this.member.id = this.mem$.msCurrentMember.id;
		this.member.name = this.mem$.msCurrentMember.name;
		this.member.dob = this.mem$.msCurrentMember.dob;
		this.member.phone = this.mem$.msCurrentMember.phone;
		this.member.phone2 = this.mem$.msCurrentMember.phone2;
		this.member.email = this.mem$.msCurrentMember.email;
		this.member.amount = this.mem$.msCurrentMember.amount;
		this.member.receiptid = this.mem$.msCurrentMember.receiptid;
		this.member.team = this.mem$.msCurrentMember.team;
		this.member.team2 = this.mem$.msCurrentMember.team2;
		this.member.team3 = this.mem$.msCurrentMember.team3;
		this.member.position = this.mem$.msCurrentMember.position;
		this.member.position2 = this.mem$.msCurrentMember.position2;
		this.member.position3 = this.mem$.msCurrentMember.position3;
		this.member.lid = this.mem$.msCurrentMember.lid;
		this.member.favteam = this.mem$.msCurrentMember.favteam;
		this.member.favplayer = this.mem$.msCurrentMember.favplayer;
		this.member.sappears = this.mem$.msCurrentMember.sappears;
		this.member.sassists = this.mem$.msCurrentMember.sassists;
		this.member.sgoals = this.mem$.msCurrentMember.sgoals;
		this.member.photo = this.mem$.msCurrentMember.photo;
		this.member.achievements = this.mem$.msCurrentMember.achievements;
		this.member.status = this.mem$.msCurrentMember.status;
		this.member.academyinfo = this.mem$.msCurrentMember.academyinfo;

			/*this.member = {
			id: [this.mem$.msCurrentMember.id],
			name: [this.mem$.msCurrentMember.name],
			dob: [this.mem$.msCurrentMember.dob],
			phone:[this.mem$.msCurrentMember.phone],
		    phone2:[this.mem$.msCurrentMember.phone2],
		    email:[this.mem$.msCurrentMember.email],
		    amount:[this.mem$.msCurrentMember.amount],
		    receiptid:[this.mem$.msCurrentMember.receiptid],
		    team:[this.mem$.msCurrentMember.team],
		    team2:[this.mem$.msCurrentMember.team2],
		    team3:[this.mem$.msCurrentMember.team3],
		    position:[this.mem$.msCurrentMember.position],
		    position2:[this.mem$.msCurrentMember.position2],
		    position3:[this.mem$.msCurrentMember.position3],
		    lid:[this.mem$.msCurrentMember.lid],
		    favteam:[this.mem$.msCurrentMember.favteam],
		    favplayer:[this.mem$.msCurrentMember.favplayer],
		    sappears:[this.mem$.msCurrentMember.sappears],
		    sassists:[this.mem$.msCurrentMember.sassists],
		    sgoals:[this.mem$.msCurrentMember.sgoals],
		    photo:[this.mem$.msCurrentMember.photo],
		    achievements:[this.mem$.msCurrentMember.achievements],
		    status:[this.mem$.msCurrentMember.status],
		    academyinfo:[this.mem$.msCurrentMember.academyinfo]
		}*/
        
    }

	public back()
	{
		console.log("...Back button pressed...");
	}

	public save()
	{
		console.log("...Save button pressed...");
		this.mem$.saveMember( this.mem$.msCurrentMember );

	}

}