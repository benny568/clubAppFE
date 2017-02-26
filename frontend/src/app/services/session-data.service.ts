import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptionsArgs,
         RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { LoggerService } from '../services/logger.service';
//import { ToolBox } from '../utilities/toolbox';
import { User } from '../model/site-user';
import { ServerMode } from '../model/server-mode';
import { Team } from '../model/team';
import { Member } from '../model/member';
import { NewsStory } from '../model/news-story';
import { Sponsor } from "../model/sponsor";

@Injectable()
export class SessionDataService {

    dsAuthenticated:boolean;
    modes = { LOCAL:0, REMOTE:1};
    CurrentServerMode:number;
    dsTeams : Array<Team>;
    dsTeamMembers = [];
    dsCurrentTeam:Team;
    dsCurrentMember:Member;
    dsCurrentUser:User;
    // dsSessionPlans = [];
    // dsTrainingRecords = [];
    // dsTrainingPerMember = [];
    dsAllMembers : Array<Member>;
    dsPosition : Array<string>;
    dsSponsors : Array<Sponsor>;
    showTeamArray = [];

    logdepth = 3;
    loghdr = "";
    serviceName = 'SessionDataService';
    displayMember = false;
    gAuthenticated = false;

     constructor ( @Inject(Http) private lg$: LoggerService, private _http: Http ) {
     this.loghdr = this.setLogHdr(this.logdepth, this.serviceName);

        var svr = new ServerMode();
        this.CurrentServerMode = svr.getServerMode();
        this.dsAuthenticated = false;
        this.dsPosition = [ 'Manager',
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
        this.dsCurrentUser = new User();
        this.dsCurrentTeam = new Team();
        this.dsCurrentMember = new Member();
        this.dsTeams = new Array<Team>();
        //this.dsTeamMembers = new Array(500);
        this.dsCurrentUser = new User();
        this.dsAllMembers = new Array<Member>();
        this.dsSponsors = new Array<Sponsor>();

        for ( let i = 0; i < this.showTeamArray.length; i++ )
		{
			this.showTeamArray[i] = false;
		}

    }

    /**********************************************************
     * Name:		setCurrentMember()
     * Description:	Set the current member to the one passed in
     * Scope:		Externally accessible
     * Params in:	member: the member in question
     * Return:
     **********************************************************/
     setCurrentMember( member:Member )
     {
         console.log("-->" + "setCurrentMember()");
         this.dsCurrentMember = member;
         this.displayMember = true;
     }

    /**********************************************************
     * Name:		difference()
     * Description:	Checeks to see if there is a difference
     *              between two objects
     * Scope:		Internal
     * Params in:	None
     * Return:
     **********************************************************/
    difference(m1, m2)
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
     * Name:		applyMemberChange()
     * Description:	Applies a change to the local data so the
     *              user sees the change on the view.
     * Scope:		Internal
     * Params in:	None
     * Return:
     **********************************************************/
    applyMemberChange(members, member)
	{
		var index:number = SessionDataService.findMemberIndex( members, member );

		if ( index === -1 )
		{
			return;
		}

		members[index].name = member.name;
		members[index].address = member.address;
		members[index].phone = member.phone;
		members[index].dob = member.dob;
		members[index].email = member.email;
		members[index].amount = member.amount;
		members[index].team = member.team;
		members[index].position = member.position;
		members[index].lid = member.lid;
		members[index].favteam = member.favteam;
		members[index].favplayer = member.favplayer;
		members[index].sappears = member.sappears;
		members[index].sassists = member.sassists;
		members[index].sgoals = member.sgoals;
		members[index].photo = member.photo;
		members[index].achievments = member.achievments;
	}

    /**********************************************************
     * Name:		deleteMember()
     * Description:	Delete a member from the db
     * Scope:		Externally accessable
     * Params in:	None
     * Return:
     **********************************************************/
    /*deleteMember( member:Member )
	{
    	console.log("    |-> deleteMember(" + member.name + ")");
    	var home = this.getHome();
    	let memberUrl = home + '/admin/member/' + member.id;

    	console.log("URL: " + memberUrl);

    	let body = JSON.stringify({ member });
        let headers = new Headers({ 'Content-Type': 'application/json' });

        let options = new RequestOptions({
    										method:'Delete',
    										headers:headers,
    										body:member,
    										url:memberUrl
        								});

    	return this._http.delete( memberUrl, options )
			.map(response => response.json())
			.subscribe( data => {
									console.log("    |<- deleteMember(data)");
									this.applyMemberDel(this.dsAllMembers, member.id);
								},
						err  => console.error("DataService: ERROR deleting member from server!"),
						()   => console.log("    |<- deleteMember()")
					);
	}*/

    /**********************************************************
     * Name:		applyMemberDel()
     * Description:	Applies a change to the local data so the
     *              user sees the change on the view.
     * Scope:		Internal
     * Params in:	None
     * Return:
     **********************************************************/
    /*applyMemberDel( members, member )
	{
		var index:number = SessionDataService.findMemberIndex( members, member );

		if ( index === -1 )
		{
			return;
		} else if ( index > -1 )
		{   // Delete the member at index
		    members.splice( index, 1 );
		}
	}*/

    /**********************************************************
     * Name:		applyMemberAdd()
     * Description:	Applies a change to the local data so the
     *              user sees the change on the view.
     * Scope:		Internal
     * Params in:	None
     * Return:
     **********************************************************/
   /* applyMemberAdd( members, member )
	{
		if ( this.dsTeamMembers[member.team] === undefined )
		{
			//getMembers4team(member.team);
		}

		var index = SessionDataService.findMemberIndex( this.dsTeamMembers[member.team], member );

		if ( index === -1 )
		{// Add the member if it doesn't exits
		    members[member.team].push( member );
		} else if ( index > -1 )
		{
			//log.debug(loghdr + "###### ERROR: applyMemberAdd - member not found!");
		}
	}*/

    /**********************************************************
     * Name:		applyTeamChange()
     * Description:	Applies a change to the local data so the
     *              user sees the change on the view.
     * Scope:		Internal
     * Params in:	None
     * Return:
     **********************************************************/
    applyTeamChange( teams, thisTeam )
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
     * Name:		findMemberIndex()
     * Description:	Find a members index/position in the array
     *              of members
     * Scope:		Internal
     * Params in:	None
     * Return:		The index value
     **********************************************************/
    static findMemberIndex( members, member )
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
     * Name:		convertPosToInt()
     * Description:	Converts the position name to the integer
     *              value
     * Scope:		Internal
     * Params in:	None
     * Return:		The position integer value
     **********************************************************/
    convertPosToInt( sPos )
	{
		return this.dsPosition.indexOf(sPos);
	}

    /**********************************************************
     * Name:		convertTeamToInt()
     * Description:	Converts the team name to the integer value
     * Scope:		Internal
     * Params in:	None
     * Return:		The team integer value
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
     * Name:		setCurrentTeamByName()
     * Description:	Set the current team in memory
     * Scope:		Internal
     * Params in:	Team name as a string
     * Return:		None
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


    private handleError( error: any ) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = ( error.message ) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        //return Observable.throw(errMsg);
      }

    /**********************************************************
     * Name:		getHome()
     * Description:	Returns the _home URL so that it can be used
     * 				as a local or remote app.
     * Scope:		Externally accessible
     * Params in:	none
     * Return:		_home URL
     **********************************************************/
    getHome() : string
    {
        var _home:string;
        //log.debug(loghdr + "-> getHome()");
        if ( this.CurrentServerMode === this.modes.LOCAL )
        {
            //log.debug(loghdr + "     | _home is LOCAL");
            //_home = 'http://localhost:8080/clubRegisterApp';
            _home = 'http://localhost:8080/backend/';
        } else if ( this.CurrentServerMode === this.modes.REMOTE )
        {
        	//log.debug(loghdr + "     | _home is REMOTE");
            _home = 'http://www.avenueunited.ie/backend/';
        }

        return _home;
    }

    /**********************************************************
     * Name:		dsGetTeams()
     * Description:	Retrieves a list of teams from the server
     * Scope:		Internal
     * Params in:	None
     * Return:		Sets dsNewsStories
     **********************************************************/
    dsGetTeams()
    {
        console.log("-->" + " dsGetTeams()..");
        var url = this.getHome();
      console.log("-->" + " dsGetTeams()..MOCK VERSION");

      /*this.dsTeams = [ {'id':0, 'name': "Junior A", 'lrcode':0, 'lrFixturesCode':0, 'lrResultsCode':0, 'noticeboard':"No info"},
                       {'id':0, 'name': "Junior B", 'lrcode':0, 'lrFixturesCode':0, 'lrResultsCode':0, 'noticeboard':"No info"},
                       {'id':0, 'name': "Youths", 'lrcode':0, 'lrFixturesCode':0, 'lrResultsCode':0, 'noticeboard':"No info"},
                     ];*/

        return this._http.get( url + '/teams' )
			.map(response => response.json())
			.subscribe( data => this.dsSetTeams(data),
						err  => console.error("DataService: ERROR reading teams from server!"),
						()   => console.log(" <== Teams received from server <==")
					);
     }

    /**********************************************************
     * Name:		dsSetTeams()
     * Description:	Set the current member to the one passed in
     * Scope:		Externally accessible
     * Params in:	member: the member in question
     * Return:
     **********************************************************/
    dsSetTeams( data )
     {
         console.log("-->" + "dsSetTeams()");
         this.dsTeams = data;
     }

    /**********************************************************
     * Name:		loadTeamDetailsByName()
     * Description:	Load the current team's details
     * Scope:		Externally accessible
     * Params in:	teamName: the name of the team in question
     * Return:
     **********************************************************/
    loadTeamDetailsByName( teamName:string )
    {
    	console.log("-->" + "loadTeamDetailsByName(" + teamName + ")");


        // Clear out the TeamMembers array first
        this.dsCurrentTeam = null;
        var url = this.getHome();

        this._http.get( url + '/team/' + teamName )
             .map(response => response.json())
             .subscribe( data => this.dsCurrentTeam = data,
   					error => console.log("ERROR: Reading team details from server, team: " + teamName),
   					() => console.log("Team details read successfully for team: " + teamName)
   				  );

    }

    /**********************************************************
     * Name:		loadTeamDetailsByNameByObservable()
     * Description:	Load the current team's details, return an
     * 				observable to the caller
     * Scope:		Externally accessible
     * Params in:	teamName: the name of the team in question
     * Return:		An observable
     **********************************************************/
    loadTeamDetailsByNameByObservable( teamName:string, indent: number )
    {
    	var prefix: string = '';

    	for ( var i = 0; i < (indent + 4); i++ )
    	{
    		prefix += ' ';
    	}
        console.log(prefix + "|-->" + "loadTeamDetailsByNameByObservable(" + teamName + ")");


        // Clear out the TeamMembers array first
        //this.dsCurrentTeam = null;
        var url = this.getHome();

        return this._http.get( url + '/team/' + teamName )
             		.map(response => response.json());

    }

    /**********************************************************
     * Name:		loadCurrentTeamMembersByNameByObservable()
     * Description:	Load the current team's members
     * Scope:		Externally accessible
     * Params in:	teamName: the name of the team in question
     * Return:		Observable
     **********************************************************/
    loadCurrentTeamMembersByNameByObservable( teamName: string, indent: number )
    {
    	var prefix: string = '';

    	for ( var i = 0; i < (indent + 4); i++ )
    	{
    		prefix += ' ';
    	}
        console.log(prefix + "|-->" + "loadCurrentTeamMembersByNameByObservable(" + teamName + ")");

        if ( this.teamMembersAreLoaded( teamName ) )
        {
        	return; // Already loaded
        }
       // Clear out the TeamMembers array first
        let teamId = this.convertTeamToInt( teamName );
        this.dsTeamMembers[teamId].length = 0;
        var url = this.getHome();

       return this._http.get( url + '/teammembers/' + teamName )
            	.map(response => response.json());
    }

    /**********************************************************
     * Name:		teamMembersAreLoaded()
     * Description:	Check to see if we've already loaded the
     * 				team members
     * Scope:		Internally accessible
     * Params in:	teamName: the name of the team in question
     * Return:		true/false
     **********************************************************/
    teamMembersAreLoaded(teamName): boolean
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
     * Name:		loadCurrentTeamMembersByName()
     * Description:	Load the current team's details and members
     * Scope:		Externally accessible
     * Params in:	teamName: the name of the team in question
     * Return:
     **********************************************************/
    loadCurrentTeamMembersByName( teamName:string, callback )
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
            var url = this.getHome();

           console.log("-->" + "loadCurrentTeamByName(), loading team:" + teamName );
           this._http.get( url + '/teammembers/' + teamName )
                .map(response => response.json())
                .subscribe( data => this.dsTeamMembers[teamId] = data, //callback(data),
	   					error => console.log("ERROR: Reading team members from server, team: " + teamName),
	   					() => console.log("<-- Team members read successfully for team: " + teamName)
	   				  );
        }
    }

    showTeamLoaded(teamId)
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
     * Name:		loadCurrentSponsors()
     * Description:	Load the current sponsors details
     * Scope:		Externally accessible
     * Params in:	None
     * Return:      Array of sponsor objects
     **********************************************************/
    loadCurrentSponsors() : Array<Sponsor>
    {
        console.log('-->' + 'loadCurrentSponsors()');

        this.dsSponsors = [ {name:"Enzo's Takeaway", image:"../../assets/img/adverts/enzos.png"},
                            {name:"Rochford's Pharmacy", image: "../../assets/img/adverts/main-sponsor.png"},
                            {name:"Ennis Cabs", image: "../../assets/img/adverts/ec.png"},
                            {name:"Cahill Taxation Services", image: "../../assets/img/adverts/CTS-logo.png"}
                        ];
        return this.dsSponsors;
    }

    /**********************************************************
     * Name:		clearCurrentMember()
     * Description:	Clear out the dsCurrentMember
     * Scope:		Externally accessible
     * Params in:	None
     * Return:      None
     **********************************************************/
    clearCurrentMember()
    {
        this.dsCurrentMember = null;
    }

    /**********************************************************
     * Name:		loadPhotoDetails()
     * Description:	Retrieves a list of photos from the server
     * Scope:		Internal
     * Params in:	None
     * Return:		Sets
     **********************************************************/
    loadPhotoDetails( url )
    {
        console.log("-->" + "loadPhotoDetails(" + url + ")");

        // ToDo: If we have already loaded the news just return

        // Read the list of files from the server
       return this._http.get( url )
            .map(response => response.json());
    }

    /**********************************************************
     * Name:		authenticate()
     * Description:	Authenticates the user with the server
     * Scope:		Internal
     * Params in:
     * Return:
     **********************************************************/
    authenticate(username, password)
    {
    	console.log("    --> authenticate(" + username + "," + password + ")");

    	var creds = "username=" + username + "&password=" + password;
		let body = JSON.stringify({ creds  });
	    let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });

	    console.log("    Calling POST on /login")
	    return this._http.post( this.getHome() + 'login', body, options);
//        return this._http.post( this.getHome() + '/login?' + creds, body, options);
    }

    authenticate2( credentials, callback )
    {
    	console.log("-->" + "authenticate2(" + credentials.username + "," + credentials.password + ")");

    	let headers = new Headers( credentials
                                   ? {authorization : "Basic " + btoa(credentials.username + ":" + credentials.password)}
    	                           : {} );

        this._http.get(this.getHome() + '/user', {headers : headers})
        	.subscribe(
        				resp => {

	        			        	console.log("## User authenticated [" + credentials.username + "]");
	        			            this.dsAuthenticated = true;
        			                callback && callback();
        			            },
        			    error => {
        			    	        this.dsAuthenticated = false;
        			    	        console.log("## Unable to get user from server [" + credentials.username + "]");
        			             },
        			    () => console.log("## Retrieved user from server [" + credentials.username + "]")

        			);

      }


    getUser(username)
    {
    	console.log("-->" + "getUser(" + username + ")");
    	return this._http.get(this.getHome() + '/admin/user').map(response => response.json());
    }

    /**********************************************************
     * Name:		logout()
     * Description:	Invalidates the user session with the server
     * Scope:		Internal
     * Params in:
     * Return:
     **********************************************************/
    logout()
    {
    	this.dsAuthenticated = false;
    	return this._http.get(this.getHome() + '/j_spring_security_logout');
    }

    /**********************************************************
     * Name:		dsGetAllMembers()
     * Description:	Get all members from the server
     * Scope:		Internal
     * Params in:
     * Return:
     **********************************************************/
    dsGetAllMembers()
    {
    	console.log("-->" + "dsGetAllMembers()");
    	var url = this.getHome();

    	return this._http.get(url + "/admin/members")
    		.map(response => response.json())
    		.subscribe(
    					data => this.dsAllMembers = data,
    					err => console.log("ERROR getting members from server!"),
    					() => console.log("<== Finished getting all members from server <==")
    					);
    }

    /**********************************************************
	 * Name:		getTeamNameFrmId()
	 * Description:	Convert a team name to it's id
	 * Scope:		Externally accessible via the service
	 * Params in:	scope: The parents scope
	 *
	 * Return:		The team id
	 **********************************************************/
    getTeamNameFrmId(iTeam, indent)
    {
    	let sIndent = ''; // Initialise the logging indent
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




	saveJwt(jwt) {
	  if ( jwt ) {
	    localStorage.setItem('id_token', jwt);
	  }
	}


	/*WriteCookie()
    {
       if( document.myform.customer.value == "" ){
          alert("Enter some value!");
          return;
       }
       cookievalue= escape(document.myform.customer.value) + ";";
       document.cookie="name=" + cookievalue;
       document.write ("Setting Cookies : " + "name=" + cookievalue );
    }

	ReadCookie()
    {
       var allcookies = document.cookie;
       document.write ("All Cookies : " + allcookies );

       // Get all the cookies pairs in an array
       cookiearray = allcookies.split(';');

       // Now take key value pair out of this array
       for(var i=0; i<cookiearray.length; i++){
          name = cookiearray[i].split('=')[0];
          value = cookiearray[i].split('=')[1];
          document.write ("Key is : " + name + " and Value is : " + value);
       }
    }*/


	/**********************************************************
     * Name:		setLogHdr()
     * Description:	Sets up the correct indentation and header
     * 				information for the log messages.
     * Scope:		Internal
     * Params in:
     * Return:
     **********************************************************/
	setLogHdr(logdepth, moduleName)
	{
		console.log("** [Logger Service] Setting log header for [" + moduleName + "]");
		let i = 0;
		let depth = logdepth * 4;
		let moduleSpace = 25;
		let hdr:string = "## " +  moduleName;

		// Make sure the field width is the standard, pad if necessary
		if ( hdr.length < moduleSpace )
		{
			let diff = moduleSpace - hdr.length;
			let i = 0;
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
}
