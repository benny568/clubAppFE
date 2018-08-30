import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../../services/logger.service';
import { CommonService } from './../../../services/common.service';

@Component({
  selector   : 'app-academy-overview',
  templateUrl: './academy-overview.component.html',
  styleUrls  : ['./academy-overview.component.css'],
  providers  : [ LoggerService ]
})
export class AcademyOverviewComponent implements OnInit {
  componentName = 'AcademyOverviewComponent';
  logdepth      = 2;
  currentSeason: String;

  constructor(  private lg$: LoggerService,
                private com$: CommonService ) { }

  ngOnInit() {
    this.lg$.setLogHdr(this.logdepth, this.componentName);
    this.currentSeason = this.com$.calculateCurrentSeason();
    this.lg$.log(this.currentSeason);
  }

}
