import { Injectable }     from '@angular/core';
import { Http, Headers }  from '@angular/http';
import { JwtHelper }      from 'angular2-jwt';

import { LoggerService } from './logger.service';
import { CommonService } from './common.service';


@Injectable()
export class AuthService {

    logdepth = 3;
    serviceName = 'AuthService';
    public token: string;

     constructor ( private lg$: LoggerService, private com$: CommonService, private http: Http )
     {
         // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
     }

    /**********************************************************
     * Name:		authenticate()
     * Description:	Authenticates the user with the server
     * Scope:		Internal
     * Params in:
     * Return:
     **********************************************************/
    authenticate(username: string, password: string) {
        let home = this.com$.getHome();
    	let url = home + "login";
        let params = 'username='+username+'&password='+password;
        let headers = new Headers(
        {
          'Content-Type': 'application/x-www-form-urlencoded'
          // 'Access-Control-Allow-Credentials' : true
        });
        console.log("Calling http POST to " + url);
        return this.http.post(url, params, {headers: headers, withCredentials : true});
      }

     logout()
     {
        let home = this.com$.getHome();
    	let url = home + "logout";

    	return this.http.get( url, { withCredentials: true } );
     }

     isLoggedIn(): boolean
     {
         let jwtHelper = new JwtHelper();
         let token = localStorage.getItem('id_token');

         if( !token )
            return false;

        let expirationDate = jwtHelper.getTokenExpirationDate( token );
        let isExpired = jwtHelper.isTokenExpired( token );
        // console.log( "Token expiration date: " + expirationDate );
        // console.log( "Token is expired: " + isExpired );

        return !isExpired;
     }

     isAllowed(requiredRole:string, requiredPermission?: string): boolean
     {
        let jwtHelper = new JwtHelper();
        let token = localStorage.getItem('id_token');
        let allowed: boolean = false;

        console.log("authService-->isAllowed(" + requiredRole + ")");

        if( !token )
            return false;

        let decodedToken: any = jwtHelper.decodeToken( token );
        let definedRoles: [string] = decodedToken.roles.split(","); // convert string to array
        for( let i=0; i<definedRoles.length; i++ )
        {
            if( definedRoles[i] === requiredRole )
            {
                allowed = true;
                break;
            }
        }

        // console.log("Decoded token is: [" + decodedToken.roles + "]");
        // console.log("           <--isAllowed(" + allowed + ")");

        return allowed;

     }

     getCurrentUser(): any
     {
        let token = localStorage.getItem('id_token');

        if( !token )
           return null;
        return new JwtHelper().decodeToken(token);
     }

     /**
      * Roles heirarchy
      * ***********************************************
      * ROLE           ** What's allowed             **
      * ***********************************************
      * ROLE_MANAGER   ** R/W their own team(s)
      * ROLE_SECRETARY ** CRUD on members
      * ROLE_ADMIN     ** CRUD on members, teams, users
      *                ** Cannot delete themselves
      *                ** Cannot edit/delete the SU
      * ROLE_SU        ** SUPER USER - can do anything
      */

      /**
       * PERMISSIONS
       * **********************************************
       * 
       */

      /**
       * ROLE_MANAGER
       * If the required role is manager then we need to check if the current user is a manager of a team and only allow them to manage those
       * teams that they are a manager off.
       * Thus, firstly check if they have the ROLE_MANAGER, secondly check what teams they are manager off, then only show those teams.
       */

       /**
        * ROLE_SECRETARY
        * Allow any member operations. Allow view only on teams.
        */

}
