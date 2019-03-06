import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../../services/logger.service';
import { CommonService } from './../../../services/common.service';
@Component({
  selector   : 'app-academy-coaches',
  templateUrl: './academy-coaches.component.html',
  styleUrls  : ['./academy-coaches.component.css'],
  providers  : [ LoggerService ]
})
export class AcademyCoachesComponent implements OnInit {
  componentName = 'AcademyCoachesComponent';
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
