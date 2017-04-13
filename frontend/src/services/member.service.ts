import { Injectable } from '@angular/core';
import { Http,
         Headers,
         RequestOptions,
         RequestOptionsArgs } from '@angular/http';

import { LoggerService } from '../services/logger.service';
import { CommonService } from '../services/common.service';
import { ServerMode } from '../model/server-mode';
import { Team } from '../model/team';
import { Member } from '../model/member';
import { Position } from '../model/position';


@Injectable()
export class MemberService {
    serviceName: string = "MemberService";
    logdepth: number = 3;

    msTeamMembers: Array<any>;
    msCurrentMember:Member;
    msAllMembers : Array<Member>;
    msDisplayMember: boolean = false;
    msPosition: Array<Position>;

    constructor( private lg$: LoggerService, private com$: CommonService, private http$: Http ) {
        this.lg$.setLogHdr(this.logdepth, this.serviceName);

        this.msCurrentMember = new Member();
        this.msTeamMembers = new Array(50);
        this.msAllMembers = new Array<Member>();
        this.msPosition = [
                        { id: 0, name: 'Undefined'},
                        { id: 1, name: 'Goalkeeper'},
                        { id: 2, name: 'RightFull'},
                        { id: 3, name: 'LeftFull'},
                        { id: 4, name: 'CenterHalf'},
                        { id: 5, name: 'MidField'},
                        { id: 6, name: 'LeftWing'},
                        { id: 7, name: 'RightWing'},
                        { id: 8, name: 'Striker'},
                        { id: 9, name: 'CAM'},
                        { id: 10, name: 'Manager'},
                        { id: 11, name: 'Chairman'},
                        { id: 12, name: 'Secretary'},
                        { id: 13, name: 'Treasurer'},
                        { id: 14, name: 'Committee'}
                    ];
        
     }

    public loadCurrentTeamMembersByTeamId( team: number, callback: any )
    {
        this.lg$.log("loadCurrentTeamMembersByTeamId()");

        let url = this.com$.getHome();

        if ( this.teamMembersAreLoaded( team ) )
        {
        	this.lg$.log("    |- Team already loaded..");
        	return; // Already loaded
        } else {

           this.lg$.log("-->" + "loadCurrentTeamMembersByTeamId(), loading team:" + team );
           this.http$.get( url + '/admin/members/' + team )
                .map(response => response.json())
                .subscribe( data => { /*this.msTeamMembers[team] = data,*/ callback(data), this.logTeamMembersForTeamId(team) },
	   					error => this.lg$.error("ERROR: Reading team members from server, team: " + team),
	   					() => this.lg$.log("<-- Team members read successfully for team: " + team)
	   				  );
        }

        
    }

    /**********************************************************
     * Name:		deleteMember()
     * Description:	Delete a member from the db
     * Scope:		Externally accessable
     * Params in:	None
     * Return:
     **********************************************************/
    public deleteMember( member:Member )
	{
    	this.lg$.log("    |-> deleteMember(" + member.name + ")");
    	var home = this.com$.getHome();
    	let memberUrl = home + '/admin/member/' + member.id;

    	this.lg$.log("URL: " + memberUrl);

    	let body = JSON.stringify({ member });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let thisTeam = member.team;

        // TBD: Find out what teams the member is on so he can be removed once deleted
            

        let options = new RequestOptions({
    										method:'Delete',
    										headers:headers,
    										body:member,
    										url:memberUrl
        								});

    	return this.http$.delete( memberUrl, options )
			.map(response => response.json())
			.subscribe( data => {
									console.log("    |<- deleteMember("+data+")");
									//this.applyMemberDel(this.msAllMembers, data);
                                    this.applyMemberDelFromTeam(this.msTeamMembers[thisTeam], data.name);
								},
						err  => console.error("MemberService: ERROR deleting member from server!"),
						()   => console.log("    |<- deleteMember() - finished")
					);
	}

    /**********************************************************
     * Name:		saveMember()
     * Description:	Save the member 
     * Scope:		Externally accessable
     * Params in:	Member in question
     * Return:
     **********************************************************/
    public saveMember( member: Member )
	{
    	console.log("    |-> saveMember(" + member.name + ")");

        let url = this.com$.getHome() + "admin/member";
        let headers = new Headers({ 'Content-Type': 'application/json' });

        let options = new RequestOptions({
    										method:'Put',
    										headers:headers,
    										body:member,
    										url:url
        								});

        return this.http$.put( url, options )
            .subscribe( data => console.log("MemberService: Member updated successfully"),
                        err  => console.error("MemberService: ERROR updating member on server!") 
                        );
	}

    /**********************************************************
     * Name:		applyMemberDel()
     * Description:	Applies a change to the local data so the
     *              user sees the change on the view.
     * Scope:		Internal
     * Params in:	None
     * Return:
     **********************************************************/
    private applyMemberDelFromTeam( team: Array<string>, member: string )
	{
        this.lg$.log("-> applyMemberDelFromTeam("+team+","+member+")");

		var index:number = this.findMemberIndexFromTeam( team, member );

		if ( index === -1 )
		{
			return;
		} else if ( index > -1 )
		{   // Delete the member at index
            this.lg$.log("Removing member from team..");
		    team.splice( index, 1 );
		}
	}

    /**********************************************************
     * Name:		applyMemberAdd()
     * Description:	Applies a change to the local data so the
     *              user sees the change on the view.
     * Scope:		Internal
     * Params in:	None
     * Return:
     **********************************************************/
    applyMemberAdd(members: Array<any>, member: Member )
	{

		if ( this.msTeamMembers[member.team] === undefined )
		{
			//getMembers4team(member.team);
		}

		var index = this.findMemberIndex( this.msTeamMembers[member.team], member.id );

		if ( index === -1 )
		{// Add the member if it doesn't exits
		    members[member.team].push( member );
		} else if ( index > -1 )
		{
			//log.debug(loghdr + "###### ERROR: applyMemberAdd - member not found!");
		}
	}

    /**********************************************************
     * Name:		findMemberIndex()
     * Description:	Find a members index/position in the array
     *              of members
     * Scope:		Internal
     * Params in:	None
     * Return:		The index value
     **********************************************************/
    private findMemberIndex( members: Array<Member>, memberId: number )
	{
        this.lg$.log("findMemberIndex - id: " + memberId);
		var index = -1;

        for(var c=0; c<members.length; c++)
            this.lg$.log("---- "+c+": "+members[c].name + ", "+ members[c].id);

		if ( typeof members !== undefined )
		{
			for ( var i = 0; i < members.length; i++ )
			{
                if( members[i] !== undefined && members[i] !== null ) // If it's not empty
                {
                    if ( members[i].id === memberId )
                    {
                        this.lg$.log("....Found member to remove, index: " + i);
                        index = i;
                        break;
                    }
                }
			}
		}

		return index;
	}

    /**********************************************************
     * Name:		findMemberIndex()
     * Description:	Find a members index/position in the array
     *              of members
     * Scope:		Internal
     * Params in:	None
     * Return:		The index value
     **********************************************************/
    private findMemberIndexFromTeam( members: Array<string>, member: string )
	{
        this.lg$.log("findMemberIndex - id: " + member);
		var index = -1;

        for(var c=0; c<members.length; c++)
            this.lg$.log("---- "+c+": "+members[c] + ", "+ c);

		if ( typeof members !== undefined )
		{
			for ( var i = 0; i < members.length; i++ )
			{
                if( members[i] !== undefined && members[i] !== null ) // If it's not empty
                {
                    if ( members[i] === member )
                    {
                        this.lg$.log("....Found member to remove, index: " + i);
                        index = i;
                        break;
                    }
                }
			}
		}

		return index;
	}

    private teamMembersAreLoaded( team: number )
    {
        this.lg$.log("    |--> teamMembersAreLoaded()");
        let loaded: boolean = false;

        if( this.msTeamMembers[team] > 0 )
        {
            loaded = true;
            this.logTeamMembersForTeamId( team );
        }

        this.lg$.log("    |- <-- teamMembersAreLoaded("+loaded+")");
        return loaded;
    }

    private logTeamMembersForTeamId( teamId: number )
    {
        this.lg$.log("logTeamMembersForTeamId()");
        for ( let i = 0; i < this.msTeamMembers[teamId].length; i++ )
		{
			this.lg$.log("-- [" + i + "]: " + this.msTeamMembers[teamId][i].name);
		}
    }
}