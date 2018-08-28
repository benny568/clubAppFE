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


    constructor ( private lg$: LoggerService,
                  private com$ : CommonService,
                  private http$: HttpClient )
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

      let options = this.setupHeaders();

      this.lg$.log("-->" + "getAllUsers(), loading users from: " + url + '/admin/users/' );
            // this.http$.get( url + '/admin/users/', options )
            //     .map(response => response.json())
            //     .subscribe( data => { this.allUsers = data, this.logUsers(this.allUsers) },
            //                error => console.error("ERROR: Reading users from server, Error: " + error )
	   				//   );
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
        // let headers = this.setupHeaders();

        // let options = new RequestOptions({
    		// 								method : 'Delete',
    		// 								headers: headers,
    		// 								body   : user,
    		// 								url    : userUrl
        // 								});

      let options = this.setupHeaders();

    	return this.http$.delete( userUrl, options )
			//.map(response => response.json())
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
    public addUser( user: User, callback: any )//: Observable<User>
    {
      this.lg$.log("addUser(" + user.name + ")");

      var home    = this.com$.getHome();
      let userUrl = home + '/admin/user/';

    	this.lg$.log("URL: " + userUrl);

      // Set the headers, including the JWT
      let options = this.setupHeaders();

    	// return this.http$.post( userUrl, user, options )
  		// 	.pipe(
      //     catchError(handleError())
      //   );
    }

    // public addUser( user: User, callback: any )
    // {
    //   this.lg$.log("addUser(" + user.name + ")");

    //   var home    = this.com$.getHome();
    //   let userUrl = home + '/admin/user/';

    // 	this.lg$.log("URL: " + userUrl);

    //     // Set the headers, including the JWT
    //     let headers = this.setupHeaders();

    //     let options = new RequestOptions({
    // 										method : 'Post',
    // 										headers: headers,
    // 										body   : user,
    // 										url    : userUrl
    //     								});

    // 	return this.http$.post( userUrl, user, options )
		// 	.map(response => response.json())
		// 	.subscribe( data => {
    //                         this.lg$.log("    |<- addMember("+data+")");
    //                       },
    //               err => this.lg$.log("UserService: ERROR adding user to server! [" + err + "]"),
    //               ()  => this.lg$.log("    |<- addUser() - finished")
    //              );
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
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type' : 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        })
      };
      this.lg$.log("Token read from storage: " + localStorage.getItem('id_token') );
      return httpOptions;
    }

    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.');
    };
}
