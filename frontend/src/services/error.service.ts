import { Injectable }     from '@angular/core';
import { Inject }         from '@angular/core';
import { ViewContainerRef } from '@angular/core';

import { Message } from 'primeng/primeng';


@Injectable()
export class ErrorService {

    logdepth = 3;
    loghdr = "";
    serviceName = 'ErrorService';
    msgs: Message[] = [];

     constructor (  ) {

     }

    /**********************************************************
     * Name:		openAlert()
     * Description:	
     * Params in:	
     * Return:		
     **********************************************************/
      openAlert( msg: string ): void {
        console.log("########## INSIDE OPEN ALERT!!");

        this.msgs.push({severity:'info', summary:'Info Message', detail:msg});

        /*this.tddialog$.openAlert({
                                    message: msg,
                                    disableClose: true || false, // defaults to false
                                    title: 'Error', //OPTIONAL, hides if not provided
                                    closeButton: 'Close', //OPTIONAL, defaults to 'CLOSE'
                                });*/
      }


}
