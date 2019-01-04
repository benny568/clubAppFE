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

     constructor() 
     {
        var svr                = new ServerMode();
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
          console.log("Token read from storage: " + localStorage.getItem('id_token') );
          console.log("Auth Hdr: " + headers.get('Authorization'));
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

}

