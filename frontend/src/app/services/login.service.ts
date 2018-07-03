import { Injectable }     from '@angular/core';
import { Http, Response,
         Headers,
         RequestOptions,
         RequestOptionsArgs,
         RequestMethod,
         URLSearchParams }  from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import { Subject }          from "rxjs/Subject";

import { LoggerService } from '../services/logger.service';
import { CommonService } from '../services/common.service';


@Injectable()
export class LoginService {

    logdepth = 3;
    serviceName = 'LoginService';
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
    authenticate( username: string, password: string )
     {
        let home = this.com$.getHome();
        let url = home + "/login"; // "http://www.avenueunited.ie/login";
        let params = 'username='+username+'&password='+password;
        let headers = new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Credentials' : true,
                'X-XSRF-TOKEN' : '123456'
            });
        console.log("Calling http POST to " + url);
        return this.http.post(url, params, {headers: headers, withCredentials : true});
     }

     sendCredential(username: string, password: string) {
        let home = this.com$.getHome();
    	let url = home + "/login";
        let params = 'username='+username+'&password='+password;
        let headers = new Headers(
        {
          'Content-Type': 'application/x-www-form-urlencoded'
          // 'Access-Control-Allow-Credentials' : true
        });
        return this.http.post(url, params, {headers: headers, withCredentials : true});
      }

     logout()
     {
    	 let url = "http://www.avenueunited.ie/logout";

    	 return this.http.get( url, { withCredentials: true } );
     }

}
