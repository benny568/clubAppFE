import { Injectable }    from '@angular/core';
import { HttpClient,
         HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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
     * @Name       : getAllUsers()
     * @Description: Read the application users from the server
     * @Scope      : Externally accessible
     * @Params     : filter: the string the user wants to filter with
     *               sort: sort direction, asc or desc 
     *               page: the page number, of data to return
     *               pagesize: The size of each page to return
     * @Return     : Observable<User[]>
     **********************************************************/
    public getAllUsers( filter: string, sort: string, page: number, pagesize: number ): Observable<User[]>
    {
      this.lg$.log("getAllUsers()");

      let url = this.com$.getHome();

      let headers: HttpHeaders = this.com$.setupHeaders();

      this.lg$.log("-->" + "getAllUsers(), loading users from: " + url + '/admin/users/' );

      return this.http$.get<User[]>( url + 'admin/users/', {headers} );
    }
    //   this.lg$.log("-->" + "getAllUsers(), loading users from: " + url + '/admin/users/' );
    //   this.http$.get( url + 'admin/users/', {headers} )
    //     .subscribe( (data: User[]) => { this.allUsers = data, this.logUsers(this.allUsers) },
    //                 error => console.error("ERROR: Reading users from server, Error: " + error )
    //  				      );
    
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
    public deleteUser( user: User, callback: any, dataSource: any, paginator: any )
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
                              callback(user, dataSource, paginator);
  								          },
        						err => this.com$.handleHttpError(err),                  //this.lg$.log("UserService: ERROR deleting user from server! [" + err + "]"),
        						()  => this.lg$.log("    |<- deleteUser() - finished")
        					);
    }

    public applyUserDelete( user: User, dataSource: MatTableDataSource<User>, paginator: MatPaginator )
    {
      console.log("** applyUserDelete(" + user.name + ")");

      let i = 0;
      for( let u of dataSource.data )
      {
        console.log("** Checking user: " + u.name + ", user.id: " + user.userId + ", u.userId: "+ u.userId);
        if( user.userId === u.userId )
        {
          dataSource.data.splice(i, 1);
          dataSource.paginator = paginator;
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
    public addUser( user: User, callback: any, dataSource: MatTableDataSource<User>, paginator: MatPaginator )//: Observable<User>
    {
      this.lg$.log("|-> addUser(" + user.name + ")");
      this.lg$.log("|-> addUser(" + dataSource + ")");

      var home    = this.com$.getHome();
      let userUrl = home + 'admin/user/';

    	this.lg$.log("URL: " + userUrl);

      // Set the headers, including the JWT
      let headers: HttpHeaders = this.com$.setupHeaders();

    	return this.http$.post( userUrl, user, {headers} )
            .subscribe( data => {
                                  callback(user, dataSource, paginator);
                                },
                        err => this.lg$.log("UserService: ERROR adding user to server! [" + err + "]"),
                        ()  => this.lg$.log("|<- addUser() - finished")
            );
    }

    public applyUserAdd( user: User, dataSource: MatTableDataSource<User>, paginator: MatPaginator ): void
    {
      console.log("** applyUserAdd(" + user.name + ")");

      let allusers: User [] = dataSource.data.concat(user);
      dataSource.data = allusers;
      dataSource.paginator = paginator;
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
      this.lg$.log("    |-> updateUser(" + user.name + ")");
    	var home      = this.com$.getHome();
    	let memberUrl = home + 'admin/user/';

    	this.lg$.log("URL: " + memberUrl);

      // Set the headers, including the JWT
      let headers: HttpHeaders = this.com$.setupHeaders();

    	return this.http$.put( memberUrl, user, {headers} )
  			.subscribe( data => {
                              this.lg$.log("    |<- updateUser("+data+")");
  								          },
                    err => this.lg$.log("UserService: ERROR saving member to server! [" + err + "]"),
                    ()  => this.lg$.log("    |<- updateUser() - finished")
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

    private defaultUserFields( user: User ): User
    {
        user.address = user.address === null ? '' : user.address;
        user.dob = user.dob === null ? '1900-1-1' : user.dob;
        user.email = user.email === null ? '' : user.email;
        user.phone = user.phone === null ? '' : user.phone;
        user.enabled = user.enabled === null ? false : user.enabled;
        user.role = user.role === null ? '' : user.role;
        
        return user;
    }
    
}
