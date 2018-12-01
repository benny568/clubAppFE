import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import { UserService } from '../../../services/user.service';
import { LoggerService } from '../../../services/logger.service';

import { User } from '../../../model/site-user';

@Component({
  selector: 'usertable',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css'],
  providers  : [ LoggerService ]
})
export class AdminReportsComponent implements OnInit {
  componentName: string   = 'AdminReportsComponent';
  logdepth     : number   = 2;
  logPrefix    : string   = '';
  dataSource: MatTableDataSource<User>;// = new UserDataSource(this.userService);
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'operations'];

  constructor( private lg$: LoggerService, private userService: UserService) 
  { 
    this.lg$.setLogHdr(this.logdepth, this.componentName);
  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.userService.getAllUsers('', 'asc', 0, 5).subscribe( results => {
      if( !results )
          return;
      this.lg$.trace("Got users from db, setting up table..");
      this.dataSource = new MatTableDataSource(results);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  deleteUser( user: User )
  {
    this.lg$.trace("    |-deleteUser(" + user.name + ")");
  }

  editUser( user: User )
  {
    this.lg$.trace("    |-editUser(" + user.name + ")");
  }

  addUser()
  {
    this.lg$.trace("    |-addUser()");
  }
}