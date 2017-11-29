import { Injectable }  from '@angular/core';
import { MatSnackBar } from '@angular/material';

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
        openAlert( msg: string ): void {
          console.log("########## INSIDE OPEN ALERT!!");
  
          this.snackBar.open( msg, 'Error', { duration: this.msgDuration } );

        }
  
  
  }
  
