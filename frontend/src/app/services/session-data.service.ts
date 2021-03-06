import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptionsArgs,
         RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';

import { LoggerService } from './logger.service';
import { CommonService } from './common.service';
//import { ToolBox } from '../utilities/toolbox';
import { User } from '../model/site-user';
import { ServerMode } from '../model/server-mode';
import { Team } from '../model/team';
import { Member } from '../model/member';
import { Sponsor } from "../model/sponsor";
import { Media } from '../model/media';
import { Observable } from 'rxjs';

@Injectable()
export class SessionDataService {

    dsAuthenticated: boolean;
    modes = { LOCAL:0, REMOTE:1};
    CurrentServerMode: number;
    dsTeams          : Array<Team>;
    dsTeamMembers    : any = [];
    dsCurrentTeam    : Team;
    dsCurrentMember  : Member;
    dsCurrentUser    : User;
    // dsSessionPlans = [];
    // dsTrainingRecords = [];
    // dsTrainingPerMember = [];
    dsAllMembers  : Array<Member>;
    dsPosition    : Array<string>;
    dsSponsors    : Array<Sponsor>;
    showTeamArray : any = [];
    dsVisitorCount: number = 0;
    public dsCookiesUserChoice: boolean = false;

    logdepth       = 3;
    loghdr         = "";
    serviceName    = 'SessionDataService';
    displayMember  = false;
    gAuthenticated = false;
    aAlbum: Array<Media>;

     constructor ( private com$: CommonService, private lg$: LoggerService, private http$: HttpClient )
     {
        this.loghdr = this.setLogHdr(this.logdepth, this.serviceName);

        var svr                    = new ServerMode();
            this.CurrentServerMode = svr.getServerMode();
            this.dsAuthenticated   = false;
            this.dsPosition        = [  'Manager',
                                        'Goalkeeper',
                                        'Full Back',
                                        'Center Half',
                                        'Mid Field',
                                        'CAM',
                                        'Winger',
                                        'Striker',
                                        'Chairman',
                                        'Secretary',
                                        'Treasurer',
                                        'PRO',
                                        'Committee'];
        this.dsCurrentUser   = new User();
        this.dsCurrentTeam   = new Team();
        this.dsCurrentMember = new Member();
        this.dsTeams         = new Array<Team>();
        //this.dsTeamMembers = new Array(500);
        this.dsCurrentUser = new User();
        this.dsAllMembers  = new Array<Member>();
        this.dsSponsors    = new Array<Sponsor>();
        this.aAlbum        = new Array<Media>();

        for ( let i = 0; i < this.showTeamArray.length; i++ )
    		{
    			this.showTeamArray[i] = false;
    		}

    }

    /**********************************************************
     * Name       : setCurrentMember()
     * Description: Set the current member to the one passed in
     * Scope      : Externally accessible
     * Params in  : member: the member in question
     * Return     :
     **********************************************************/
     public setCurrentMember( member:Member )
     {
         console.log("-->" + "setCurrentMember()");
         this.dsCurrentMember = member;
         this.displayMember   = true;
     }

    /**********************************************************
     * Name       : difference()
     * Description: Checeks to see if there is a difference
     *              between two objects
     * Scope    : Internal
     * Params in: None
     * Return   :
     **********************************************************/
    difference(m1: any, m2: any)
    {
        var diff = false;
        Object.getOwnPropertyNames(m1).forEach(function(val, idx, array) {
            if ( m1[val] !== m2[val] )
            {
                diff = true;
            }
        });

        return diff;
    }


    /**********************************************************
     * Name       : applyMemberChange()
     * Description: Applies a change to the local data so the
     *              user sees the change on the view.
     * Scope    : Internal
     * Params in: None
     * Return   :
     **********************************************************/
    applyMemberChange(members: [Member], member: Member)
  	{
  		var index:number = SessionDataService.findMemberIndex( members, member );

  		if ( index === -1 )
  		{
  			return;
  		}

  		members[index].name         = member.name;
  		members[index].address      = member.address;
  		members[index].phone        = member.phone;
  		members[index].dob          = member.dob;
  		members[index].email        = member.email;
  		members[index].amount       = member.amount;
  		members[index].team         = member.team;
  		members[index].position     = member.position;
  		members[index].lid          = member.lid;
  		members[index].favteam      = member.favteam;
  		members[index].favplayer    = member.favplayer;
  		members[index].sappears     = member.sappears;
  		members[index].sassists     = member.sassists;
  		members[index].sgoals       = member.sgoals;
  		members[index].photo        = member.photo;
  		members[index].achievements = member.achievements;
  	}


    /**********************************************************
     * Name       : applyTeamChange()
     * Description: Applies a change to the local data so the
     *              user sees the change on the view.
     * Scope    : Internal
     * Params in: None
     * Return   :
     **********************************************************/
    applyTeamChange( teams: [Team], thisTeam: Team )
    {
        var index:number = -1;

        if ( this.dsTeams.length === 0 )
        {
            this.dsGetTeams();
        }


        for ( var i = 0; i < this.dsTeams.length; i++ )
        {
            if ( this.dsTeams[i].id === thisTeam.id )
            {
                index = i;
                break;
            }
        }

        if ( index === -1 )
        {
            //log.debug(loghdr + "###### ERROR: applyTeamChange - team not found!");
        } else if ( index > -1 )
        {
            this.dsTeams[index] = thisTeam;
            //log.debug(loghdr + " -> applyTeamChange - team updated: " + thisTeam.name );
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
    static findMemberIndex( members: [Member], member: Member )
  	{
  		var index = -1;

  		if ( typeof members !== undefined )
  		{
  			for ( var i = 0; i < members.length; i++ )
  			{
  				if ( members[i].id === member.id )
  				{
  					index = i;
  					break;
  				}
  			}
  		}

  		return index;
  	}

    /**********************************************************
     * Name       : convertPosToInt()
     * Description: Converts the position name to the integer
     *              value
     * Scope    : Internal
     * Params in: None
     * Return   : The position integer value
     **********************************************************/
    convertPosToInt( sPos: string )
  	{
  		return this.dsPosition.indexOf(sPos);
  	}

    /**********************************************************
     * Name       : convertTeamToInt()
     * Description: Converts the team name to the integer value
     * Scope      : Internal
     * Params in  : None
     * Return     : The team integer value
     **********************************************************/
    convertTeamToInt( sTeam:string )
  	{
  		for ( var i = 0; i < this.dsTeams.length; i++ )
  		{
  			if ( this.dsTeams[i].name === sTeam )
  			{
  				return this.dsTeams[i].id;
  			}
  		}
  		return 0;
  	}

    /**********************************************************
     * Name       : setCurrentTeamByName()
     * Description: Set the current team in memory
     * Scope      : Internal
     * Params in  : Team name as a string
     * Return     : None
     **********************************************************/
    setCurrentTeamByName( teamName: string)
    {
    	console.log("-->" + "setCurrentTeamByName(" + teamName + ")");

        // Ensure the teams information has been loaded
        if ( this.dsTeams.length < 1 )
        {
            this.dsGetTeams();
        }

        // Pick out this team and set it as the current one
        for ( var team of this.dsTeams )
        {
            if ( team.name === teamName ) {
                this.dsCurrentTeam = team;
                console.log( "-->" + "setCurrentTeamByName(): Team set to " + teamName);
                break;
            }
        }
    }

    /**********************************************************
     * Name       : dsGetTeams()
     * Description: Retrieves a list of teams from the server
     * Scope      : Internal
     * Params in  : None
     * Return     : Sets dsNewsStories
     **********************************************************/
    public dsGetTeams()
    {
        console.log("-->" + " dsGetTeams()..");
        var url = this.com$.getHome();
        console.log("-->" + " dsGetTeams() - home is (" + url + ")");

      /*this.dsTeams = [ {'id':0, 'name': "Junior A", 'lrcode':0, 'lrFixturesCode':0, 'lrResultsCode':0, 'noticeboard':"No info"},
                       {'id':0, 'name': "Junior B", 'lrcode':0, 'lrFixturesCode':0, 'lrResultsCode':0, 'noticeboard':"No info"},
                       {'id':0, 'name': "Youths", 'lrcode':0, 'lrFixturesCode':0, 'lrResultsCode':0, 'noticeboard':"No info"},
                     ];*/

        return this.http$.get( url + 'public/teams' )
    			.subscribe( (data: [Team]) => this.dsSetTeams(data),
    						err => console.error("DataService: ERROR reading teams from server!"),
    						()  => console.log(" <== Teams received from server <==")
    					);
     }

    /**********************************************************
     * Name       : dsSetTeams()
     * Description: Set the current member to the one passed in
     * Scope      : Externally accessible
     * Params in  : member: the member in question
     * Return     :
     **********************************************************/
    public dsSetTeams( data: [Team] )
     {
         console.log("-->" + "dsSetTeams()");
         this.dsTeams = data;
     }

    /**********************************************************
     * Name       : loadTeamDetailsByName()
     * Description: Load the current team's details
     * Scope    : Externally accessible
     * Params in: teamName: the name of the team in question
     * Return   :
     **********************************************************/
    public loadTeamDetailsByName( teamName:string )
    {
    	console.log("-->" + "loadTeamDetailsByName(" + teamName + ")");


        // Clear out the TeamMembers array first
                                            this.dsCurrentTeam = null;
                                        var url                = this.com$.getHome();

        this.http$.get( url + 'public/team/' + teamName )
             .subscribe( (data: Team) => this.dsCurrentTeam = data,
                 					error => console.log("ERROR: Reading team details from server, team: " + teamName),
                 					()    => console.log("Team details read successfully for team: " + teamName)
                 				  );

    }

    /**********************************************************
     * Name       : loadTeamMembersByIdByObservable()
     * Description: Load the current team's details, return an
     * 				observable to the caller
     * Scope    : Externally accessible
     * Params in: team the id of the team in question
     * Return   : An observable
     **********************************************************/
    public loadTeamMembersByIdByObservable( team: number )
    {
        let url = this.com$.getHome();
        console.log("loadTeamMembersByIdByObservable -> [" + url + 'public/teammembers/' + team + "]");

        return this.http$.get( url + 'public/teammembers/' + team );
    }

    /**********************************************************
     * Name       : loadTeamDetailsByNameByObservable()
     * Description: Load the current team's details, return an
     * 				observable to the caller
     * Scope    : Externally accessible
     * Params in: teamName: the name of the team in question
     * Return   : An observable
     **********************************************************/
    public loadTeamDetailsByNameByObservable( teamName:string, indent: number )
    {
        var prefix: string = '';
        let teamId: number;

    	for ( var i = 0; i < (indent + 4); i++ )
    	{
    		prefix += ' ';
    	}
        console.log(prefix + "|-->" + "loadTeamDetailsByNameByObservable(" + teamName + ")");

        // Clear out the TeamMembers array first
        //this.dsCurrentTeam = null;
        var url = this.com$.getHome();
        console.log("loadTeamDetailsByNameByObservable -> [" + url + 'public/team' + teamName + "]");

        return this.http$.get( url + 'public/team/' + teamName );

    }

    /**********************************************************
     * Name       : loadCurrentTeamMembersByNameByObservable()
     * Description: Load the current team's members
     * Scope    : Externally accessible
     * Params in: teamName: the name of the team in question
     * Return   : Observable
     **********************************************************/
    public loadCurrentTeamMembersByNameByObservable( teamName: string, indent: number )
    {
    	var prefix: string = '';

        if( indent > 0 )
        {
        	for ( var i = 0; i < (indent + 4); i++ )
        	{
        		prefix += ' ';
        	}
        }
        console.log(prefix + "|-->" + "loadCurrentTeamMembersByNameByObservable(" + teamName + ")");

        if ( this.teamMembersAreLoaded( teamName ) )
        {
        	return; // Already loaded
        }
       // Clear out the TeamMembers array first
        let teamId = this.convertTeamToInt( teamName );

        if( this.dsTeamMembers[teamId] !== undefined )
            this.dsTeamMembers[teamId].length = 0;
            var                url            = this.com$.getHome();

       return this.http$.get( url + 'public/teammembers/' + teamName );
    }

    /**********************************************************
     * Name       : teamMembersAreLoaded()
     * Description: Check to see if we've already loaded the
     * 				team members
     * Scope    : Internally accessible
     * Params in: teamName: the name of the team in question
     * Return   : true/false
     **********************************************************/
    private teamMembersAreLoaded(teamName: string): boolean
    {
    	let teamId = this.convertTeamToInt( teamName );
    	console.log("    |--> teamMembersAreLoaded: " + this.dsTeamMembers[teamId]);

    	if ( (this.dsTeamMembers[teamId] === null) || (this.dsTeamMembers[teamId] === undefined) )
    	{
    		console.log("         |-- Member array not defined, i.e. not loaded..");
    		return false;

    	} else if ( ( this.dsTeamMembers[teamId].length !== 0 ) && ( this.dsCurrentTeam.name === teamName ) )
        {
            console.log("-->" + "teamMembersAreLoaded():" + "Members of [" + teamName + "] already loaded not loading again!");
            return true;

        } else {
        	return false;
        }
    }

    /**********************************************************
     * Name       : loadCurrentTeamMembersByName()
     * Description: Load the current team's details and members
     * Scope    : Externally accessible
     * Params in: teamName: the name of the team in question
     * Return   :
     **********************************************************/
    public loadCurrentTeamMembersByName( teamName:string, callback: string )
    {
        console.log("-->" + "loadCurrentTeamMembersByName(" + teamName + ")");
        let teamId = this.convertTeamToInt( teamName );

        if ( this.teamMembersAreLoaded( teamName ) )
        {
        	console.log("    |- Team already loaded..");
        	this.showTeamLoaded( teamId );
        	return; // Already loaded
        } else {
           // Clear out the TeamMembers array first
        	let teamId = this.convertTeamToInt( teamName );
        	var url    = this.com$.getHome();

           console.log("-->" + "loadCurrentTeamByName(), loading team:" + teamName );
           this.http$.get( url + 'public/teammembers/' + teamName )
                .subscribe( data => this.dsTeamMembers[teamId] = data, //callback(data),
              	   					error => console.log("ERROR: Reading team members from server, team: " + teamName),
              	   					()    => console.log("<-- Team members read successfully for team: " + teamName)
              	   				  );
        }
    }

    private showTeamLoaded(teamId: number)
  	{
  		console.log("showTeamLoaded()");

  		for ( let i = 0; i < this.dsTeamMembers[teamId].length; i++ )
  		{
  			console.log("-- [" + i + "]: " + this.dsTeamMembers[teamId][i].name);
  		}
  	}

    /// TEMP FUNCTION TO SIM REST CALL TO SERVER
    getTeamDetailsSim( teamName:string ) : Team {
        return this.dsCurrentTeam; // = this._sds.getTeamDetailsByName(teamName);
    }

    /**********************************************************
     * Name       : clearCurrentMember()
     * Description: Clear out the dsCurrentMember
     * Scope      : Externally accessible
     * Params in  : None
     * Return     : None
     **********************************************************/
    public clearCurrentMember()
    {
        this.dsCurrentMember = null;
    }

    /**********************************************************
     * Name       : loadPhotoDetails()
     * Description: Retrieves a list of photos from the server
     * Scope      : Internal
     * Params in  : None
     * Return     : Sets
     **********************************************************/
    public loadPhotoDetails( url: string )
    {
        console.log("-->" + "loadPhotoDetails(" + url + ")");

        // Read the list of files from the server
       return this.http$.get( url );
    }

    /**********************************************************
     * Name       : loadVideoDetails()
     * Description: Retrieves a list of videos from the server
     * Scope      : Internal
     * Params in  : None
     * Return     : Sets
     **********************************************************/
    public loadVideoDetails( url: string )
    {
        console.log("-->" + "loadVideoDetails(" + url + ")");

        // Read the list of files from the server
       return this.http$.get( url );
    }

    public getUser(username: string)
    {
    	console.log("-->" + "getUser(" + username + ")");
    	return this.http$.get(this.com$.getHome() + '/admin/user');
    }


    /**********************************************************
     * Name       : dsGetAllMembers()
     * Description: Get all members from the server
     * Scope      : Internal
     * Params in  :
     * Return     :
     **********************************************************/
    public dsGetAllMembers()
    {
    	console.log("-->" + "dsGetAllMembers()");
    	var url = this.com$.getHome();

    	return this.http$.get(url + "/admin/members")
    		.subscribe(
    					(data: [Member]) => this.dsAllMembers = data,
    					err              => console.log("ERROR getting members from server!"),
    					()               => console.log("<== Finished getting all members from server <==")
    					);
    }

    /**********************************************************
	 * Name       : getTeamNameFrmId()
	 * Description: Convert a team name to it's id
	 * Scope    : Externally accessible via the service
	 * Params in: scope: The parents scope
	 *
	 * Return: The team id
	 **********************************************************/
    public getTeamNameFrmId(iTeam: number, indent: number)
    {
    	let sIndent = '';  // Initialise the logging indent
    	for ( let i = 0; i < indent; i++ )
    	{
    		sIndent += ' ';
    	}
    	console.log(sIndent + "==> getTeamNameFrmId(" + iTeam + ")");

    	var sTeamId = "";

    	for ( var i = 0; i < this.dsTeams.length; i++ )
    	{
    		if ( iTeam === this.dsTeams[i].id )
    		{
    			sTeamId = this.dsTeams[i].name;
    			console.log(sIndent + "        ::: team FOUND " + i + " = " + this.dsTeams[i].name);
    			console.log(sIndent + "<== getTeamNameFrmId(" + sTeamId + ")");
    			return sTeamId;
    		}
    			console.log(sIndent + "        ::: team not team " + i + " = " + this.dsTeams[i].name);
    	}

    	console.log(sIndent + "<== getTeamNameFrmId(" + sTeamId + ")");
    	return sTeamId;
    }




  	saveJwt(jwt: string) {
  	  if ( jwt ) {
  	    localStorage.setItem('id_token', jwt);
  	  }
  	}


  	/**********************************************************
     * Name       : setLogHdr()
     * Description: Sets up the correct indentation and header
     * 				information for the log messages.
     * Scope    : Internal
     * Params in:
     * Return   :
     **********************************************************/
  	private setLogHdr(logdepth: number, moduleName: string)
  	{
  		console.log("** [Logger Service] Setting log header for [" + moduleName + "]");
  		let i           = 0;
  		let depth       = logdepth * 4;
  		let moduleSpace = 25;
  		let hdr:string  = "## " +  moduleName;

  		// Make sure the field width is the standard, pad if necessary
  		if ( hdr.length < moduleSpace )
  		{
  			let diff = moduleSpace - hdr.length;
  			let i    = 0;
  			for ( i = 0; i < diff; i++ )
  			{
  				hdr += ' ';
  			}
  		}

  		// (1) Set the indentation according to the depth
  		for ( i = 0; i < depth; i++ )
  		{
  			hdr += " ";
  		}

  		// (2) Add on call stack indicator
  		hdr += "|-";

  		return hdr;
  	}

     private handleError( error: any ) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let          errMsg = ( error.message ) ? error.message:
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        //return Observable.throw(errMsg);
      }

    /**********************************************************
     * Name       : processPhotosResponse()
     * Description: Adds the list of photos recieved from the
     *              server to the album and redirects to the
     *              photos component.
     * Scope    : Internal
     * Params in: data: The data received from the server
     * path     : The path to the photos on the server
     * album    : The media album to put the photos in
     * Return   : None
     **********************************************************/
    processPhotosResponse( data: [any], path: string, album: Array<Media>, router:Router )
  	{
  		this.lg$.log("-> processResponse()");
  		this.lg$.log("     |- data:" + data);
  		this.lg$.log("     |- path:" + path);
  		this.lg$.log("     |- album:" + album);
  		var self = this;

  		data.forEach(function(row){
  			var photo : Media = new Media();
  			    photo.image   = path + row;
  			album.push(photo);
  			self.lg$.log("         |- added image: " + photo.image );
  		});

  		this.lg$.log("<- processResponse()");

          this.lg$.trace("Redirecting to /photos");
          router.navigate(['/photos']);
  	}

    /**********************************************************
     * Name       : printAlbum()
     * Description: Logs the content of the albumn.
     * Scope      :
     * Params in  : data: The data received from the server
     * path       : The path to the photos on the server
     * album      : The media album to put the photos in
     * Return     : None
     **********************************************************/
    public printAlbum()
    {
        for( let picture of this.aAlbum )
        {
            this.lg$.trace( picture.image );
        }
    }

    /**********************************************************
     * Name       : getClubOfficers()
     * Description: Retrievs the current club officers from db.
     * Scope      :
     * Params in  : None
     * Return     : Arrah of officers
     **********************************************************/
    public getClubOfficers()
    {
        console.log("-->" + " getClubOfficers()..");
        var url = this.com$.getHome();
        console.log("-->" + " getClubOfficers() - home is (" + url + ")");

        return this.http$.get( url + 'public/officers' );
     }

     /**********************************************************
     * Name       : getVisitorCount()
     * Description: Get the current visitor count fromt the
     *              server.
     * Scope    : Externally accessible
     * Params in: None
     * Return   : The current count
     **********************************************************/
    public getVisitorCount(): any
    {
      let url = this.com$.getHome();

      return this.http$.get( url + 'public/vcount' );
    }

    /**********************************************************
     * Name       : incrementVisitorCount()
     * Description: Increment the count on the server and return
     *              the new value.
     * Scope    : Externally accessible
     * Params in: None
     * Return   : None, it sets the dsVisitorCount variable.
     **********************************************************/
    public incrementVisitorCount(): void
    {
      let url = this.com$.getHome();

      this.http$.get( url + 'public/ivcount' )
            .subscribe( (data: number) => this.dsVisitorCount = data,
                        error => console.log("ERROR: Incrementing visitor count on server"),
                        ()    => console.log("Visitor count updated successfully")
                      );
    }
}
