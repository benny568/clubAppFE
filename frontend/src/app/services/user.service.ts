import { Injectable }    from '@angular/core';
import { Http,
         Headers,
         RequestOptions } from '@angular/http';

import { User }          from '../model/site-user';
import { LoggerService } from '../services/logger.service';
import { CommonService } from '../services/common.service';
import { SessionDataService } from '../services/session-data.service';

@Injectable()
export class UserService {
    CurrentUser    : User;
    isAuthenticated: boolean;
    usLoggedIn     : boolean;
    allUsers       : Array<User>;
    componentName = 'UserService';
    logdepth      = 1;


    constructor ( private lg$: LoggerService,
                  private com$ : CommonService,
                  private d$   : SessionDataService,
                  private http$: Http )
    {
        this.lg$.setLogHdr(this.logdepth, this.componentName);
        this.CurrentUser = new User();
        this.allUsers    = new Array<User>();
    }

    public setCurrentUser( user: User )
    {
        this.CurrentUser = user;
    }

    public getCurrentUser()
    {
        return this.CurrentUser;
    }

    public getUserDetails ( username: string )
     {
        this.lg$.log("-> getUserDetails(" + username + ")");
        let url = this.com$.getHome() + "/admin/user/" + username;

        return this.http$.get( url );
     }

    public getUserName()
    {
        return this.CurrentUser.name;
    }

    public setUserAsAuthenticated()
    {
        this.isAuthenticated = true;
    }

    /**********************************************************
     * Name       : getAllUsers()
     * Description: Read the application users from the server
     * Scope      : Externally accessible
     * Params in  : None
     * Return     : None
     **********************************************************/
    public getAllUsers()
    {
      this.lg$.log("getAllUsers()");

      let url = this.com$.getHome();

      let headers      = this.setupHeaders();
      let opts         = new RequestOptions();
          opts.headers = headers;

      this.lg$.log("-->" + "getAllUsers(), loading users from: " + url + '/admin/users/' );
            this.http$.get( url + '/admin/users/', opts )
                .map(response => response.json())
                .subscribe( data => { this.allUsers = data, this.logUsers(this.allUsers) },
                           error => console.error("ERROR: Reading users from server, Error: " + error )
	   				  );
    }

    /**********************************************************
     * Name       : logUsers()
     * Description: Log the list of users in memory
     * Scope      : Externally accessible
     * Params in  : None
     * Return     : None
     **********************************************************/
    public logUsers(allUsers)
    {
      let i = 0;
      for( let user of allUsers )
      {
        let u:User = user;
        this.lg$.log("User[" + i++ + "]: " + u.name);
      }
    }

    /**********************************************************
     * Name       : editUser()
     * Description: Edit the given user
     * Scope      : Externally accessible
     * Params in  : The user object
     * Return     : None
     **********************************************************/
    public editUser( user: User )
    {
      this.lg$.log("editUser(" + user.name + ")");
    }

    /**********************************************************
     * Name       : deleteUser()
     * Description: Delete the given user
     * Scope      : Externally accessible
     * Params in  : The user object
     * Return     : None
     **********************************************************/
    public deleteUser( user: User, callback: any )
    {
      this.lg$.log("deleteUser(" + user.name + ")");

      var home    = this.com$.getHome();
      let userUrl = home + '/admin/user/';

    	this.lg$.log("URL: " + userUrl);

        // Set the headers, including the JWT
        let headers = this.setupHeaders();

        let options = new RequestOptions({
    										method : 'Delete',
    										headers: headers,
    										body   : user,
    										url    : userUrl
        								});

    	return this.http$.delete( userUrl, options )
			.map(response => response.json())
			.subscribe( data => {
                                    this.lg$.log("    |<- deleteUser("+data+")");
                                    callback(user);
								},
						err => this.lg$.log("UserService: ERROR deleting user from server! [" + err + "]"),
						()  => this.lg$.log("    |<- deleteUser() - finished")
					);
    }

    public applyUserDelete( user )
    {
      console.log("applyUserDelete(" + user.name + ")");

      let i = 0;
      for( let u of this.allUsers )
      {
        if( user.id === u.id )
        {
          this.allUsers.splice(i, 1);
          console.log("User deleted.");
        }

        i++;
      }
    }

    /**********************************************************
     * Name       : addUser()
     * Description: Add the given user
     * Scope      : Externally accessible
     * Params in  : The user object
     * Return     : None
     **********************************************************/
    public addUser( user: User, callback: any )
    {
      this.lg$.log("addUser(" + user.name + ")");

      var home    = this.com$.getHome();
      let userUrl = home + '/admin/user/';

    	this.lg$.log("URL: " + userUrl);

        // Set the headers, including the JWT
        let headers = this.setupHeaders();

        let options = new RequestOptions({
    										method : 'Post',
    										headers: headers,
    										body   : user,
    										url    : userUrl
        								});

    	return this.http$.post( userUrl, user, options )
			.map(response => response.json())
			.subscribe( data => {
                            this.lg$.log("    |<- addMember("+data+")");
                          },
                  err => this.lg$.log("UserService: ERROR adding user to server! [" + err + "]"),
                  ()  => this.lg$.log("    |<- addUser() - finished")
                 );
    }

    /**********************************************************
     * Name       : hasPermission()
     * Description: Check the user's permission to perform the
     * 				given action
     * Scope    : Externally accessible
     * Params in: action: the action being requested
     * Return   : true or false depending on the permissions
     **********************************************************/
    // public hasPermission(action: any, params: any)
    // {
    //     var team  = '';
    //     var allow = false;
    //     var index = 0;

    //     console.log("-->" + "hasPermission(" + action + "," + params + ")");

    //     if ( typeof action === undefined || params === undefined )
    //     {
    //       console.log("No action or params, returning false!")
    //       return false;
    //     }

    //     for ( var r = 0; r < this.CurrentUser.authorities.length; r++ )
    //     {
    //         if ( this.CurrentUser.authorities[r] === "ROLE_SUPER" )
    //         {
    //           // Super user has permissions to do anything
    //           //log.trace(loghdr + " -> hasPermission("+action+"): YES");
    //         	console.log(" -> hasPermission(" + action + "): YES");
    //           return true;
    //         }
    //     }
    //     switch ( action )
    //     {
    //         case 'MANAGE_TEAM':
    //             team = params;
    //             // Check if the user is a manager of this team
    //             for ( var i = 0; i < this.CurrentUser.permissions.teams.length; i++ )
    //             {
    //                 for ( var t = 0; t < this.d$.dsTeams.length; t++ )
    //                 {
    //                     if (  this.d$.dsTeams[t].id === this.CurrentUser.permissions.teams[i] )
    //                     {
    //                         index = t;
    //                         break;
    //                     }
    //                 }

    //                 if ( this.d$.dsTeams[index].name === team )
    //                 {
    //                     if ( this.CurrentUser.permissions.positions[i] === 0 )
    //                     {
    //                         allow = true;
    //                         break;
    //                     }
    //                 }
    //             }
    //             break;

    //         case 'ADD_TEAM' :
    //         case 'EDIT_TEAM':
    //             for ( var r = 0; r < this.CurrentUser.authorities.length; r++ )
    //             {
    //                 if ( this.CurrentUser.authorities[r] === "ROLE_SUPER" )
    //                 {
    //                     // Super user has permissions to do anything
    //                     allow = true;
    //                     break;
    //                 } else if ( this.CurrentUser.authorities[r] === "ROLE_EDIT_TEAM" )
    //                 {
    //                     allow = true;
    //                     break;
    //                 }
    //             }
    //             break;
    //         case 'DEL_TEAM':
    //             for ( var r = 0; r < this.CurrentUser.authorities.length; r++ )
    //             {
    //                 if ( this.CurrentUser.authorities[r] === "ROLE_SUPER" )
    //                 {
    //                     // Super user has permissions to do anything
    //                     allow = true;
    //                     break;
    //                 } else if ( this.CurrentUser.authorities[r] === "ROLE_DEL_TEAM" )
    //                 {
    //                     allow = true;
    //                     break;
    //                 }
    //             }
    //             break;

    //         case 'ADD_USER'   :
    //         case 'EDIT_USER'  :
    //         case 'DELETE_USER':
    //         case 'VIEW_USERS' :
    //           console.log("Checking permission for user admin..");
    //           for ( var r = 0; r < this.CurrentUser.authorities.length; r++ )
    //           {
    //                 if ( this.CurrentUser.authorities[r] === "ROLE_ADMIN" )
    //               {
    //                   // Super user has permissions to do anything
    //                   allow = true;
    //                   break;
    //               }
    //           }
    //           break;
    //     }

    //     return allow;
    // }

  private setUserDetails( user: User )
	{
		this.lg$.log("-> setUserDetails()");
		this.CurrentUser = user;
		this.usLoggedIn  = true;
		localStorage.setItem('AdminHasLoggedIn', 'true');
		this.isAuthenticated = true;
		this.lg$.log('User login status: ' + this.isAuthenticated );
    }

    private setupHeaders()
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        this.lg$.log("Token read from storage: " + localStorage.getItem('id_token') );
        return headers;
    }

    private handleError()
    {

    }
}
