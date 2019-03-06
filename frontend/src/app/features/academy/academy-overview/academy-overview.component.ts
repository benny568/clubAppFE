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
  u4s: number;
  u5s: number;
  u6s: number;
  u7s: number;
  u8s: number;
  u9s: number;
  u10s: number;

  constructor(  private lg$: LoggerService,
                private com$: CommonService ) { }

  ngOnInit() {
    this.lg$.setLogHdr(this.logdepth, this.componentName);
    this.currentSeason = this.com$.calculateCurrentSeason();

    // Calculate the year of birth for the age groups
    let now: Date = new Date();
    let year:number = now.getFullYear();
    let term = this.calculateTerm();

    this.u4s = term == 1 ? (year-4) : (year-5);
    this.u5s = term == 1 ? (year-5) : (year-6);
    this.u6s = term == 1 ? (year-6) : (year-7);
    this.u7s = term == 1 ? (year-7) : (year-8);
    this.u8s = term == 1 ? (year-8) : (year-9);
    this.u9s = term == 1 ? (year-9) : (year-10);
    this.u10s = term == 1 ? (year-10) : (year-11);

    this.lg$.log(this.currentSeason);
  }

  calculateTerm():number
  {
    let term:number = 0;
    const date: Date   = new Date();
    let year   = date.getFullYear();
    let month  = date.getMonth();     // Remember this is 0 for Jan etc.

    if( month > 6 && month <= 11 ) // First period
      term = 1;
    else
      term = 2;  // Second term

    return term;
  }

}
