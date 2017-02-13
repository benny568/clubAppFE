import { Injectable }     from '@angular/core';
import { Inject }         from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core';


@Injectable()
export class ErrorService {

    logdepth = 3;
    loghdr = "";
    serviceName = 'ErrorService';

     constructor ( private tddialog$: TdDialogService ) {

     }

    /**********************************************************
     * Name:		openAlert()
     * Description:	
     * Params in:	
     * Return:		
     **********************************************************/
      openAlert( msg: string ): void {
        console.log("########## INSIDE OPEN ALERT!!");

        this.tddialog$.openAlert({
                                    message: msg,
                                    disableClose: true || false, // defaults to false
                                    title: 'Error', //OPTIONAL, hides if not provided
                                    closeButton: 'Close', //OPTIONAL, defaults to 'CLOSE'
                                });
      }


}
