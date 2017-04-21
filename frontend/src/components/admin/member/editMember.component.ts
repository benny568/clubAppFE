import { Component }     from '@angular/core';
import { Router    }     from '@angular/router';
import { FormBuilder,  
         FormGroup }     from '@angular/forms';

import { LoggerService } from '../../../services/logger.service';
import { CommonService } from '../../../services/common.service';
import { MemberService } from '../../../services/member.service';
import { SessionDataService } from '../../../services/session-data.service';

import { Member }        from '../../model/member';
import { Position }      from '../../model/position';

@Component({
    template: require('./editMember.component.html'),
    styles: [require('./editMember.component.css').toString()]
})

export class EditMemberComponent {
    memberForm: FormGroup;
	member: {};

    constructor( private lg$: LoggerService, 
				 private com$: CommonService,
				 private mem$: MemberService,
				 private d$: SessionDataService,
				 fb: FormBuilder ) 
    {
			this.member = {
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
		}
        
    }

	private back()
	{
		console.log("...Back button pressed...");
	}

	private save()
	{
		console.log("...Save button pressed...");
		this.mem$.saveMember( this.mem$.msCurrentMember );

	}

}