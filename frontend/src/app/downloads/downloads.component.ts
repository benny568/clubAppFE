import { Component, OnInit } from '@angular/core';


import { LoggerService } from '../services/logger.service';
import { CommonService } from '../services/common.service';

@Component({
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css' ],
  providers  : [ LoggerService ]
})

export class DownloadsComponent implements OnInit {
  componentName = 'DownloadsComponent';
  logdepth      = 2;
  currentSeason: String;

  constructor(  private lg$: LoggerService,
                private com$: CommonService ) { }

  ngOnInit()
  {
    this.lg$.setLogHdr(this.logdepth, this.componentName);
    this.currentSeason = this.com$.calculateCurrentSeason();
  }

}
