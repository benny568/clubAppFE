import { Injectable }    from '@angular/core';
import { HttpClient,
         HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { User }          from '../model/site-user';
import { LoggerService } from '../services/logger.service';
import { CommonService } from '../services/common.service';

@Injectable()
export class UserService {
    CurrentUser    : User;
    isAuthenticated: boolean;
    usLoggedIn     : boolean;
    allUsers       : Array<User>;
    componentName = 'UserService';
    logdepth      = 1;
    roles: string[];


    constructor ( private lg$: LoggerService,
                  private com$ : CommonService,
                  private http$: HttpClient )
    {
        this.lg$.setLogHdr(this.logdepth, this.componentName);
        this.CurrentUser = new User();
        this.allUsers    = new Array<User>();
        // TODO: read the roles from the db
        this.roles = ['ROLE_USER', 'ROLE_MANAGER', 'ROLE_SECRETARY', 'ROLE_ADMIN'];
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

      let headers: HttpHeaders = this.com$.setupHeaders();

      this.lg$.log("-->" + "getAllUsers(), loading users from: " + url + '/admin/users/' );
      this.http$.get( url + 'admin/users/', {headers} )
        .subscribe( (data: User[]) => { this.allUsers = data, this.logUsers(this.allUsers) },
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
        this.lg$.log("User[" + i++ + "]: " + u.name + " , uId: " + u.userId);
      }
    }

    /**********************************************************
     * Name       : logUser()
     * Description: Log the user details
     * Scope      : Externally accessible
     * Params in  : None
     * Return     : None
     **********************************************************/
    public logUser(user: User): void
    {
      if( user !== null )
      {
        this.lg$.log(" User id: " + user.userId);
        this.lg$.log(" User name: " + user.name);
        this.lg$.log(" User address: " + user.address);
        this.lg$.log(" User DOB: " + user.dob);
        this.lg$.log(" User email: " + user.email);
        this.lg$.log(" User phone: " + user.phone);
        this.lg$.log(" User status: " + user.enabled);
        this.lg$.log(" User role: " + user.role);
      }
      else
        this.lg$.log("==> Null user passed to logUser!");
      return;
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
      this.lg$.log("    |-> deleteUser(" + user.name + ")");

      var home    = this.com$.getHome();
      let userUrl = home + 'admin/user/';
      // Add the id of the user to delete
      userUrl += user.userId;

    	this.lg$.log("URL: " + userUrl);

      let headers: HttpHeaders = this.com$.setupHeaders();  //this.setupHeaders();
      this.lg$.trace("Auth Hdr: " + headers.get('Authorization'));

    	return this.http$.delete( userUrl, {headers} )
  			.subscribe( data => {
                              this.lg$.log("    |<- deleteUser("+data+")");
                              callback(user, this.allUsers);
  								          },
        						err => this.com$.handleHttpError(err),                  //this.lg$.log("UserService: ERROR deleting user from server! [" + err + "]"),
        						()  => this.lg$.log("    |<- deleteUser() - finished")
        					);
    }

    public applyUserDelete( user, allUsers )
    {
      console.log("** applyUserDelete(" + user.name + ")");

      let i = 0;
      for( let u of allUsers )
      {
        console.log("** Checking user: " + u.name + ", user.id: " + user.userId + ", u.userId: "+ u.userId);
        if( user.userId === u.userId )
        {
          allUsers.splice(i, 1);
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
    public addUser( user: User, callback: any )//: Observable<User>
    {
      this.lg$.log("|-> addUser(" + user.name + ")");

      var home    = this.com$.getHome();
      let userUrl = home + '/admin/user/';

    	this.lg$.log("URL: " + userUrl);

      // Set the headers, including the JWT
      let headers: HttpHeaders = this.com$.setupHeaders();

    	return this.http$.post( userUrl, user, {headers} )
            .subscribe( data => {
                                  this.lg$.log("|<- addUser("+data+")");
                                  callback(user, this.allUsers);
                                },
                        err => this.lg$.log("UserService: ERROR adding user to server! [" + err + "]"),
                        ()  => this.lg$.log("|<- addUser() - finished")
            );
    }

    public applyUserAdd( user: User, allUsers: User[] ): void
    {
      console.log("** applyUserAdd(" + user.name + ")");

      allUsers.push(user);
    }

    /**********************************************************
     * Name       : updateUser()
     * Description: Updatethe given user
     * Scope      : Externally accessible
     * Params in  : The user object
     * Return     : None
     **********************************************************/
    public updateUser( user: User, callback: any )//: Observable<User>
    {
      this.lg$.log("|-> updateUser(" + user.name + ")");

      var home    = this.com$.getHome();
      let userUrl = home + '/admin/user/';

    	this.lg$.log("URL: " + userUrl);

      // Set the headers, including the JWT
      let headers: HttpHeaders = this.com$.setupHeaders();

    	return this.http$.put( userUrl, user, {headers} )
            .subscribe( data => {
                                  this.lg$.log("|<- updateUser("+data+")");
                                },
                        err => this.com$.handleHttpError(err),              // this.lg$.log("UserService: ERROR updating user on server! [" + err + "]"),
                        ()  => this.lg$.log("|<- updateUser() - finished")
                      );
    }

    private setUserDetails( user: User )
  	{
  		this.lg$.log("-> setUserDetails()");
  		this.CurrentUser = user;
  		this.usLoggedIn  = true;
  		localStorage.setItem('AdminHasLoggedIn', 'true');
  		this.isAuthenticated = true;
  		this.lg$.log('User login status: ' + this.isAuthenticated );
    }

}
