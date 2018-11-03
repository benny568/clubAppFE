import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

import { environment } from './../../environments/environment';
import { ServerMode } from '../model/server-mode';

import { LoggerService } from '../services/logger.service';

export class CommonService {

    modes = { LOCAL:0, REMOTE:1};
    CurrentServerMode: number;

    logdepth    = 3;
    loghdr      = "";
    serviceName = 'CommonService';

     constructor () 
     {
        var svr                    = new ServerMode();
        this.CurrentServerMode = svr.getServerMode();
     }

    /**********************************************************
     * Name       : getHome()
     * Description: Returns the _home URL so that it can be used
     * 				as a local or remote app.
     * Scope    : Externally accessible
     * Params in: none
     * Return   : _home URL
     **********************************************************/
    getHome() : string {
        var _home: string;

        if ( environment.production === false )
        {
        	 _home = 'http://localhost:8080/backend/';
        } else if ( this.CurrentServerMode === this.modes.REMOTE )
        {
            _home = 'http://www.avenueunited.ie/backend/';
        }

        return _home;
  }

	/**********************************************************
     * Name       : getGalleryHome()
     * Description: Returns the _home URL so that it can be used
     * 				as a local or remote app.
     * Scope    : Externally accessible
     * Params in: none
     * Return   : _home URL
     **********************************************************/
    getGalleryHome() : string {
        var _home: string;

        if ( environment.production === false )
        {
        	 _home = 'http://localhost:8080/';
        } else
        {
            _home = 'http://www.avenueunited.ie/';
        }

        return _home;
    }

    /**********************************************************
     * Name       : isValidName()
     * Description: Checks that there are one or more words in
     * 				the name
     * Params in: The name entered
     * Return   : true or false
     **********************************************************/
    isValidName( name: string ): boolean
  	{
  		//this.lg$.log("----> checkName(" + name + ")");

  		if ( ( name !== undefined ) && ( name !== '' ) )
  		{
  			return /^\w+/.test(name);
  		} else
  		{
  			//this.lg$.log("----> checkName(" + name + ") undefined or blank!");
  			return false;
  		}
  	}

    /**********************************************************
     * Name       : isValidEmail()
     * Description: Checks that the entered text matches the
     * 				basic rules to be an email address.
     * Params in: The email entered
     * Return   : true or false
     **********************************************************/
  	isValidEmail( email: string ): boolean
  	{
  		//this.lg$.log("----> checkEmail(" + email + ")");
  		console.log("----> checkEmail(" + email + ")");

  		if ( ( email !== undefined ) && ( email !== '' ) )
  		{
  			return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(email);
  		} else
  		{
  			console.log("----> checkEmail(" + email + ") undefined or blank!");
  			return false;
  		}
  	}

	/**********************************************************
     * Name       : isValidPhone()
     * Description: Checks that the entered text matches the
     * 				basic rules to be an Irish phone number.
     * Params in: The email entered
     * Return   : true or false
     **********************************************************/
	isValidPhone( phone: string ): boolean
	{
		console.log("----> checkPh(" + phone + ")");
		console.log("== " + /^\d{10}$/.test(phone) );
		console.log("== " + /^\+\d{12}$/.test(phone) );

		if ( ( phone !== undefined ) && ( phone !== '' ) )
		{
			if ( (/^\d{10}$/.test(phone)) || (/^\+\d{12}$/.test(phone)) )
			{
				return true;
			} else
			{
				return false;
			}

		} else
		{
			//this.lg$.log("----> checkPh(" + phone + ") undefined or blank!");
			return false;
		}
	}

	/**********************************************************
     * Name       : isValidDob()
     * Description: Checks that the dob is not empty
     * Params in  : The name entered
     * Return     : true or false
     **********************************************************/
    isValidDob( name: string ): boolean
  	{
  		//this.lg$.log("----> checkName(" + name + ")");

  		if ( ( name !== undefined ) && ( name !== '' ) )
  		{
  			return /^\w+/.test(name);
  		} else
  		{
  			//this.lg$.log("----> checkName(" + name + ") undefined or blank!");
  			return false;
  		}
  	}

    /**********************************************************
     * Name       : isEmpty()
     * Description: Checks if a field is empty empty
     * Params in  : The field entered
     * Return     : true or false
     **********************************************************/
    isEmpty( field: string ): boolean
  	{
  		if ( ( field === undefined ) || ( field === '' ) )
  		{
  			return false;
  		} else
  		{
  			return true;
  		}
  	}

	/**********************************************************
     * Name       : clearArray()
     * Description: Clears the contents of the array passed in.
     * Scope      : Externally accessible
     * Params in  : The array to clear
     * Return     : none
     **********************************************************/
  	public clearArray( array, lg$: LoggerService )
  	{
  		lg$.trace("-> clearArray()");

  		while( array.length )
  		{
  			lg$.trace("....sending array value to trash");
  			array.pop();
  		}
    }

    /**********************************************************
     * Name       : setupHeaders()
     * Description: Set the JWT in the header so we can access
     *              secure content from the server.
     * Scope    : Externally accessible
     * Params in: None
     * Return   : The headers struct
     **********************************************************/
    public setupHeaders(): HttpHeaders
    {
        let headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        // this.lg$.log("Token read from storage: " + localStorage.getItem('id_token') );
        // this.lg$.log("Auth Hdr: " + headers.get('Authorization'));
        return headers;
    }

    /**********************************************************
     * Name       : calculateCurrentSeason()
     * Description: Depending on the current month, this returns
     *              the current season. Used by UI pages.
     * Scope    : Externally accessible
     * Params in: None
     * Return   : The current season, e.g. "2018/2019"
     **********************************************************/
    public calculateCurrentSeason(): String
    {
      var season = "";
      const date: Date   = new Date();
      let year   = date.getFullYear();
      let month  = date.getMonth();     // Remember this is 0 for Jan etc.

      if( month > 6 && month <= 11 ) // First period
        season = year + "/" + (year+1);
      else
        season = (year-1) + "/" + year;  // Second term

      return season;
    }

    /**********************************************************
     * Name       : getLogDepth()
     * Description: Convert a number to that number of spaces.
     * Scope      : Externally accessible
     * Params in  : None
     * Return     : The log depth as spaces.
     **********************************************************/
    public getLogDepth( depth: number ): string
    {
      let prefix: string = '';

      for( let i:number=0; i<depth; i++ )
      {
        prefix.concat(' ');
      }

      return prefix;
    }

    /**********************************************************
     * Name       : convertDate()
     * Description: Convert a Date type to the string value of
     *              dd-mm-yy as this is what the server expects
     * Scope    : Externally accessible
     * Params in: Date
     * Return   : The string format of the date.
     **********************************************************/
    public convertDateToString( dob: Date ): string
    {
      let day:number   = dob.getUTCDate()+1;
      let month:number = dob.getUTCMonth()+1;
      let year:number  = dob.getUTCFullYear();

      let birthday = (day < 10 ? ("0"+day) : day) + "-" + (month < 10 ? ("0"+month) : month ) + "-" +  year;
      // this.lg$.log("The date built is: " + birthday );
      // this.lg$.log("The day is: " + day );
      // this.lg$.log("The month is: " + month );

      return birthday;
    }

    /**********************************************************
     * Name       : handleHttpError()
     * Description: Called when there's an error on a http call
     * Scope    : Externally accessible
     * Params in: Date
     * Return   : None.
     **********************************************************/
    public handleHttpError(error: HttpErrorResponse)
    {
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

