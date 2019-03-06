import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import { LoggerService, LogType } from '../../../services/logger.service';
import { CommonService } from './../../../services/common.service';
import { MemberService } from '../../../services/member.service';

import { Member } from '../../../model/member';

@Component({
  selector: 'app-paid-members-report',
  templateUrl: './paid-members-report.component.html',
  styleUrls: ['./paid-members-report.component.css'],
  providers  : [ LoggerService ]
})

export class PaidMembersReportComponent implements OnInit {
  componentName: string   = 'PaidMembersReportComponent';
  logdepth     : number   = 3;
  logPrefix    : string   = '########';
  myControl    : FormControl;
  startDate    : Date;
  endDate      : Date;
  initialDate  : Date;
  showReport   : boolean;
  dataSource: MatTableDataSource<Member>;// = new UserDataSource(this.userService);
  displayedColumns: string[] = ['id', 'name', 'address', 'phone', 'operations'];

  constructor(  private lg$ : LoggerService,
                private com$: CommonService,
                private mbr$: MemberService
              )
  {
    this.lg$.setLogHdr(this.logdepth, this.componentName);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() 
  {
    this.lg$.trace("ngOnInit()", LogType.function);
    this.showReport = false;
    this.mbr$.getAllMembers(this.doesNothing).subscribe( results => {
      if( !results )
          return;
      this.lg$.trace("Got members from db", LogType.message);
      this.mbr$.msAllMembers = results;
    });
    this.myControl = new FormControl();
  }

  doesNothing()
  {
    return;
  }

  runReport()
  {
    let report: Array<Member>;
    this.showReport = true;
    this.lg$.trace("runReport()", LogType.function);

    this.lg$.trace("StartDate: " + this.startDate, LogType.message);
    this.lg$.trace("EndDate: " + this.endDate, LogType.message);

    report = this.mbr$.runPaidMembersReport(this.startDate, this.endDate);

    this.dataSource = new MatTableDataSource(report);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.lg$.trace("Number of members in report: " + report.length, LogType.message);
  }

}
