import { Injectable }    from '@angular/core';
import { Http }          from '@angular/http';

import { User }          from '../model/site-user';
import { LoggerService } from '../services/logger.service';
import { CommonService } from '../services/common.service';
import { SessionDataService } from '../services/session-data.service';

@Injectable()
export class UserService {
    CurrentUser: User;
    isAuthenticated:boolean;
    usLoggedIn: boolean;
    

    constructor ( private lg$: LoggerService, 
                  private com$: CommonService,
                  private d$: SessionDataService,
                  private http: Http ) {
        this.CurrentUser = new User();
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
        
        return this.http.get( url );
     }
   
    public getUserName()
    {
        return this.CurrentUser.username;
    }
	
    public setUserAsAuthenticated()
    {
        this.isAuthenticated = true;
    }

    /**********************************************************
     * Name:		hasPermission()
     * Description:	Check the user's permission to perform the
     * 				given action
     * Scope:		Externally accessible
     * Params in:	action: the action being requested
     * Return:		true or false depending on the permissions
     **********************************************************/
    public hasPermission(action: any, params: any)
    {
        var team = '';
        var allow = false;
        var index = 0;

        console.log("-->" + "hasPermission(" + action + "," + params + ")");

        if ( typeof action === undefined || params === undefined )
        {
            return false;
        }

        for ( var r = 0; r < this.CurrentUser.authorities.length; r++ )
        {
            if ( this.CurrentUser.authorities[r] === "ROLE_SUPER" )
            {
                // Super user has permissions to do anything
                //log.trace(loghdr + " -> hasPermission("+action+"): YES");
            	console.log(" -> hasPermission(" + action + "): YES");
                return true;
            }
        }
        switch ( action )
        {
            case 'MANAGE_TEAM':
                team = params;
                // Check if the user is a manager of this team
                for ( var i = 0; i < this.CurrentUser.permissions.teams.length; i++ )
                {
                    for ( var t = 0; t < this.d$.dsTeams.length; t++ )
                    {
                        if (  this.d$.dsTeams[t].id === this.CurrentUser.permissions.teams[i] )
                        {
                            index = t;
                            break;
                        }
                    }

                    if ( this.d$.dsTeams[index].name === team )
                    {
                        if ( this.CurrentUser.permissions.positions[i] === 0 )
                        {
                            allow = true;
                            break;
                        }
                    }
                }
                break;

            case 'ADD_TEAM':
            case 'EDIT_TEAM':
                for ( var r = 0; r < this.CurrentUser.authorities.length; r++ )
                {
                    if ( this.CurrentUser.authorities[r] === "ROLE_SUPER" )
                    {
                        // Super user has permissions to do anything
                        allow = true;
                        break;
                    } else if ( this.CurrentUser.authorities[r] === "ROLE_EDIT_TEAM" )
                    {
                        allow = true;
                        break;
                    }
                }
                break;
            case 'DEL_TEAM':
                for ( var r = 0; r < this.CurrentUser.authorities.length; r++ )
                {
                    if ( this.CurrentUser.authorities[r] === "ROLE_SUPER" )
                    {
                        // Super user has permissions to do anything
                        allow = true;
                        break;
                    } else if ( this.CurrentUser.authorities[r] === "ROLE_DEL_TEAM" )
                    {
                        allow = true;
                        break;
                    }
                }
                break;

            case 'ADD_USER':
            case 'EDIT_USER':
            case 'DELETE_USER':
            case 'VIEW_USERS':
                for ( var r = 0; r < this.CurrentUser.authorities.length; r++ )
                {
                     if ( this.CurrentUser.authorities[r] === "ROLE_SUPER" )
                    {
                        // Super user has permissions to do anything
                        allow = true;
                        break;
                    }
                }
                break;
        }

        return allow;
    }

    private setUserDetails( user: User )
	{
		this.lg$.log("-> setUserDetails()");
		this.CurrentUser = user;
		this.usLoggedIn = true;
		localStorage.setItem('AdminHasLoggedIn', 'true');
		this.isAuthenticated = true;
		this.lg$.log('User login status: ' + this.isAuthenticated );
    }
}