import {Component} from '@angular/core';

import { SessionDataService } from '../services/session-data.service';
import { LoggerService }      from '../services/logger.service';

@Component({
    selector   : 'visitor-count',
    templateUrl: './visitor-count.component.html',
    styleUrls  : ['./visitor-count.component.css'],
    providers  : [ LoggerService ]
})

export class VisitorCountComponent {
  componentName  : string   = 'VisitorCountComponent';
  logdepth       : number   = 2;
  numberOfDigits : number   = 0;
  vcountDigits   : string[] = new Array();

    constructor( public d$: SessionDataService, private lg$: LoggerService ) { }

    ngOnInit() {
    	this.lg$.setLogHdr(this.logdepth, this.componentName);
      this.getVisitorCount();
    }

    /**********************************************************
     * Name       : getVisitorCount()
     * Description: Load the visitor count
     * Scope      : Internally accessible
     * Params in  : None
     * Return     : None, it sets dsVisitorCount
     **********************************************************/
    private getVisitorCount()
    {
        console.log('-->' + 'getVisitorCount()');
        this.d$.getVisitorCount()
          .subscribe( (data: number) => { this.d$.dsVisitorCount = data;
                                          this.breakdownVisitorCount() },
                          error => console.log("ERROR: Reading visitor count from server"),
                          ()    => console.log("Visitor count read successfully")
                        );
    }

    /**********************************************************
     * Name       : breakdownVisitorCount()
     * Description: Extract details of the count to be used in
     *              displaying a graphical representation.
     * Scope    : Internally accessible
     * Params in: None
     * Return   :
     **********************************************************/
    private breakdownVisitorCount(): void
    {
        this.lg$.log('-->' + ' breakdownVisitorCount()');

        this.numberOfDigits = this.d$.dsVisitorCount.toString().length;
        this.lg$.log("    |- d$.dsVisitorCount set to [" + this.d$.dsVisitorCount + "]");
        this.lg$.log("    |- d$.dsVisitorCount.toString [" + this.d$.dsVisitorCount.toString() + "]");
        this.lg$.log("    |- numberOfDigits set to [" + this.d$.dsVisitorCount.toString().length + "]");

        let x: number = 0;

        for( x=0; x<this.numberOfDigits; x++ )
        {
          this.vcountDigits.push( this.d$.dsVisitorCount.toString().substr(x,1) );//this.d$.dsVisitorCount.toString().substr(x+1,1);
          this.lg$.log("    |- Adding [" + this.vcountDigits[x] + "]");
        }

        this.lg$.log("    |- vcountDigits are: " + this.vcountDigits);
        return;
    }
}

