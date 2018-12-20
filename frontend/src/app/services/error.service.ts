import { Injectable }  from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';

@Injectable()
export class ErrorService {
  
      logdepth = 3;
      loghdr = "";
      serviceName = 'ErrorService';
      msgDuration = 3000; // 3 seconds
  
       constructor ( public snackBar: MatSnackBar ) {
  
       }
  
      /**********************************************************
       * Name:		openAlert()
       * Description:
       * Params in:
       * Return:
       **********************************************************/
      public openAlert( msg: string ): void {
        console.log("########## INSIDE OPEN ALERT!!");

        this.snackBar.open( msg, 'Error', { duration: this.msgDuration } );

      }

        /**********************************************************
         * Name       : handleHttpError()
         * Description: Called when there's an error on a http call
         * Scope    : Externally accessible
         * Params in: Date
         * Return   : None.
         **********************************************************/
        public handleError(error: HttpErrorResponse) {
          let msg = 'You do not have permissions to perform this action!';

          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } 
          else 
          {   
              switch( error.status )
              {
                case 403:
                  console.error("You do not have permissions to perform this action!");
                  break;
                default:
                  // The backend returned an unsuccessful response code.
                  // The response body may contain clues as to what went wrong,
                  console.error(
                    `Backend returned code ${error.status}, ` +
                    `body was: ${error.error}`);
                    break;
              }
          }
          // return an observable with a user-facing error message
          return throwError(
            'Something bad happened; please try again later.');
        };
  
  
  }
  
