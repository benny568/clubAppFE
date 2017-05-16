import { Component, OnInit }  from '@angular/core';

import { SessionDataService } from '../../services/session-data.service';
import { LoggerService }      from '../../services/logger.service';
import { CommonService }      from '../../services/common.service';

import '../../assets/img/fleadh/bg4.jpg';

@Component({
   // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./home.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  loggedIn = '';

  constructor( private lg$: LoggerService,
               private d$: SessionDataService,
               private com$: CommonService )
  {}

  public ngOnInit() {
    console.log('hello `Home` component');
    this.loggedIn = localStorage.getItem( 'AdminHasLoggedIn');

    if( this.loggedIn === 'true')
      this.d$.dsAuthenticated = true;
    else
      this.d$.dsAuthenticated = false;

    this.lg$.log('User login status: ' + this.d$.dsAuthenticated );
  }

}
