import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers,
         RequestOptions,
         RequestOptionsArgs } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

import { LoggerService } from '../services/logger.service';
import { CommonService } from '../services/common.service';
import { ServerMode } from '../model/server-mode';
import { Team } from '../model/team';
import { Member } from '../model/member';
import { Position } from '../model/position';


@Injectable()
export class MemberService {
    serviceName: string  = "MemberService";
    logdepth    : number = 3;

    msTeamMembers  : Array<any>;
    msCurrentMember: Member;
    msAllMembers   : Array<Member>;
    msDisplayMember: boolean = false;
    msPosition     : Array<Position>;

    constructor( private lg$: LoggerService,
                 private com$ : CommonService,
                 private http$: HttpClient )
    {
        this.lg$.setLogHdr(this.logdepth, this.serviceName);

        this.msCurrentMember = new Member();
        this.msTeamMembers   = new Array(50);
        this.msAllMembers    = new Array<Member>();
        this.msPosition      = [
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

     /**********************************************************
     * Name       : getAllMembers()
     * Description: Load all members from the database
     * Scope      : Externally accessable
     * Params in  : A call back to call ehen done
     * Return     : Members
     **********************************************************/
    public getAllMembers( callback: any )
    {
        this.lg$.log("getAllMembers()");

        let url = this.com$.getHome();

        if ( this.membersAreLoaded() )
        {
        	this.lg$.log("    |- Members already loaded..");
        	return; // Already loaded
        }
        else
        {
            let headers: HttpHeaders = this.setupHeaders();
            this.lg$.log("Headers set are: " + headers.keys() );

            this.lg$.log("-->" + "getAllMembers()" );
            this.http$.get( url + 'admin/members/', {headers} )
                .subscribe( (data:Array<Member>) => { this.msAllMembers = data, callback() },
                            error => console.error("ERROR: Reading members from server"
                                                    + ", Error: " + error ),
	   					              () => this.lg$.log("<-- Members read successfully")
	   				  );
        }


    }

    /**********************************************************
     * Name       : loadCurrentTeamMembersByTeamId()
     * Description: Load the members for a particular team
     * Scope      : Externally accessable
     * Params in  : The team id and a call back to call ehen done
     * Return     : Members in the team
     **********************************************************/
    public loadCurrentTeamMembersByTeamId( team: number, callback: any )
    {
        this.lg$.log("loadCurrentTeamMembersByTeamId()");

        let url = this.com$.getHome();

        if ( this.teamMembersAreLoaded( team ) )
        {
        	this.lg$.log("    |- Team already loaded..");
        	return; // Already loaded
        }
        else
        {


            let headers: HttpHeaders = this.setupHeaders();
            this.lg$.log("Headers set are: " + headers.keys() );

           this.lg$.log("-->" + "loadCurrentTeamMembersByTeamId(), loading team:" + team );
           this.http$.get( url + '/admin/team/' + team, {headers} )
                .subscribe( (data:Array<Member>) => { this.msTeamMembers[team] = data, callback(team) , this.logTeamMembersForTeamId(team) },
                            error => console.error("ERROR: Reading team members from server, team: " + team
                                                    + ", Error: " + error ),
	   					              () => this.lg$.log("<-- Team members read successfully for team: " + team)
	   				  );
        }


    }

    /**********************************************************
     * Name       : addMember()
     * Description: Save the member
     * Scope      : Externally accessable
     * Params in  : Member in question
     * Return     : 
     **********************************************************/
    public addMember( member: Member, callback )
	{
      this.lg$.log("    |-> addMember(" + member.name + ")");
    	var home      = this.com$.getHome();
    	let memberUrl = home + '/admin/member/';

        this.lg$.log("URL: " + memberUrl);

        // Set the headers, including the JWT
        let headers: HttpHeaders = this.setupHeaders();

        return this.http$.post( memberUrl, member, {headers} )
            .subscribe( data => {
                                  this.lg$.log("    |<- addMember("+data+")");
                                  callback(this.msAllMembers, member, this.msTeamMembers, this.lg$, this);
                                },
                        err => this.lg$.log("MemberService: ERROR adding member to server! [" + err + "]"),
                        ()  => this.lg$.log("    |<- addMember() - finished")
            );

    }

    /**********************************************************
     * Name       : deleteMember()
     * Description: Delete a member from the db
     * Scope      : Externally accessable
     * Params in  : None
     * Return     : 
     **********************************************************/
    public deleteMember( member:Member, callback )
	{
    	this.lg$.log("    |-> deleteMember(" + member.name + ")");
    	var home      = this.com$.getHome();
    	let memberUrl = home + '/admin/member/' + member.id;

    	this.lg$.log("URL: " + memberUrl);

        // Set the headers, including the JWT
        let headers: HttpHeaders = this.setupHeaders();
        // Save the team so we can update the internal memory if successful
        let thisTeam = member.team;

        // TBD: Find out what teams the member is on so he can be removed once deleted

    	return this.http$.delete( memberUrl, {headers} )
  			.subscribe( (data: number) => {
                              this.lg$.log("    |<- deleteMember("+data+")");
                              callback(this.msAllMembers, member, this.msTeamMembers, this.lg$, this);
  								          },
  						err => this.lg$.log("MemberService: ERROR deleting member from server! [" + err + "]"),
  						()  => this.lg$.log("    |<- deleteMember() - finished")
  					);
    }



    /**********************************************************
     * Name       : saveMember()
     * Description: Save the member
     * Scope      : Externally accessable
     * Params in  : Member in question
     * Return     : 
     **********************************************************/
    public saveMember( member:Member )
	{
    	this.lg$.log("    |-> saveMember(" + member.name + ")");
    	var home      = this.com$.getHome();
    	let memberUrl = home + 'admin/member/';

    	this.lg$.log("URL: " + memberUrl);

      // Set the headers, including the JWT
      let headers: HttpHeaders = this.setupHeaders();

    	return this.http$.put( memberUrl, member, {headers} )
  			.subscribe( data => {
                                    this.lg$.log("    |<- saveMember("+data+")");
  								},
  						err => this.lg$.log("MemberService: ERROR saving member to server! [" + err + "]"),
  						()  => this.lg$.log("    |<- saveMember() - finished")
  					);
	}

    /**********************************************************
     * Name       : applyMemberDel()
     * Description: Applies a change to the local data so the
     *              user sees the change on the view.
     * Scope    : Internal
     * Params in: None
     * Return   : 
     **********************************************************/
    public applyMemberDelFromTeam( team: Array<Member>, member: number )
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
     * Name       : applyMemberAdd()
     * Description: Applies a change to the local data so the
     *              user sees the change on the view.
     * Scope    : Internal
     * Params in: None
     * Return   : 
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
     * Name       : findMemberIndex()
     * Description: Find a members index/position in the array
     *              of members
     * Scope    : Internal
     * Params in: None
     * Return   : The index value
     **********************************************************/
    public findMemberIndex( members: Array<Member>, memberId: number )
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
     * Name       : findMemberIndex()
     * Description: Find a members index/position in the array
     *              of members
     * Scope    : Internal
     * Params in: None
     * Return   : The index value
     **********************************************************/
    public findMemberIndexFromTeam( members: Array<Member>, memberId: number )
	{
      this.lg$.log("findMemberIndex - id: " + memberId);
		  var index = -1;

      for(var c=0; c<members.length; c++)
            this.lg$.log("---- "+c+": "+members[c] + ", "+ c);

  		if ( typeof members !== undefined )
  		{
  			for ( var i = 0; i < members.length; i++ )
  			{
                  if( members[i] !== undefined && members[i] !== null ) // If it's not empty
                  {
                      let mem: Member = members[i];
                      if ( mem.id === memberId )
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

    private membersAreLoaded()
    {
        this.lg$.log("    |--> membersAreLoaded()");
        let loaded: boolean = false;

        if( this.msAllMembers.length > 0 )
        {
            loaded = true;
        }

        this.lg$.log("    |- <-- membersAreLoaded("+loaded+")");
        return loaded;
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
        this.lg$.log("logTeamMembersForTeamId(" + teamId + ")");
        this.lg$.log("Number of members: " + this.msTeamMembers[teamId].length);
        for ( let i = 0; i < this.msTeamMembers[teamId].length; i++ )
    		{
                this.lg$.log("-- [" + i + "]: " + this.msTeamMembers[teamId][i].name);
                this.lg$.log("-- [" + i + "]: " + this.msTeamMembers[teamId][i].dob);
    		}
    }

    private setupHeaders(): HttpHeaders
    {
        let headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        this.lg$.log("Token read from storage: " + localStorage.getItem('id_token') );
        this.lg$.log("Auth Hdr: " + headers.get('Authorization'));
        return headers;
    }
}
