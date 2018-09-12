import { Injectable }     from '@angular/core';
import { Inject }         from '@angular/core';
import { Http }           from '@angular/http';
import { Headers }        from '@angular/http';
import { RequestOptions } from '@angular/http';

import { LoggerService }  from '../../../services/logger.service';
import { CommonService }  from '../../../services/common.service';
import { ServerMode }     from '../../../model/server-mode';
import { Member }         from '../../../model/member';
import { Data } from '@angular/router/src/config';

export class regDetails {
	firstname     : string;
	lastname      : string;
	email         : string;
	dob           : string;
	address       : string;
	phone1        : string;
	phone2        : string;
	allergies     : string;
	asthma        : boolean;
	diabetes      : boolean;
	medication    : string;
	notes         : string;
	regdate       : string;
	mothername    : string;
	fatername     : string;
	halfterm      : boolean;
	secondchild   : boolean;
	thirdchild    : boolean;
	generalconsent: boolean;
	pictureconsent: boolean;


	getFirstname()      { return this.firstname; }
	getLastname()       { return this.lastname; }
	getEmail()          { return this.email; }
	getDob()            { return this.dob; }
	getAddress()        { return this.address; }
	getPhone1()         { return this.phone1; }
	getPhone2()         { return this.phone2; }
	getAllergies()      { return this.allergies; }
	getAsthma()         { return this.asthma; }
	getDiabetes()       { return this.diabetes; }
	getMedication()     { return this.medication; }
	getNotes()          { return this.notes; }
	getRegdate()        { return this.regdate; }
	getMotherName()     { return this.mothername; }
	getFatherName()     { return this.fatername; }
	getHalfterm()       { return this.halfterm; }
	getSecondchild()    { return this.secondchild; }
	getThirdchild()     { return this.thirdchild; }
	getGeneralconsent() { return this.generalconsent; }
	getPictureconsent() { return this.pictureconsent; }

	setFirstname( name: string )        { this.firstname = name; }
	setLastname(name: string )          { this.lastname = name; }
	setEmail( email: string )           { this.email = email; }
	setDob( date: string )              { this.dob = date; }
	setAddress( value: string )         { this.address = value; }
	setPhone1( phone: string )          { this.phone1 = phone; }
	setPhone2( phone: string )          { this.phone2 = phone; }
	setAllergies( value: string )       { this.allergies = value; }
	setAsthma( value: boolean )         { this.asthma = value; }
	setDiabetes( value: boolean )       { this.diabetes = value; }
	setMedication( value: string )      { this.medication = value; }
	setNotes( value: string )           { this.notes = value; }
	setRegdate( value: string )         { this.regdate = value; }
	setMotherName( value: string )      { this.mothername = value; }
	setFatherName( value: string )      { this.fatername = value; }
	setHalfterm( value: boolean )       { this.halfterm = value; }
	setSecondchild( value: boolean )    { this.secondchild = value; }
	setThirdchild( value: boolean )     { this.thirdchild = value; }
	setGeneralconsent( value: boolean ) { this.generalconsent = value; }
	setPictureconsent( value: boolean ) { this.pictureconsent = value; }

}


@Injectable()
export class AcademyRegistrationService {
	member = new Member();
	payment: string;
  logdepth    = 3;
  loghdr      = "";
  serviceName = 'AcademyRegistrationService';
	regData: regDetails;
	timeStamp = new Date().getMinutes();

	constructor ( private lg$: LoggerService, private com$: CommonService, private _http: Http )
	{
		this.lg$.setLogHdr(this.logdepth, this.serviceName);
		this.regData = new regDetails();
		this.lg$.log("********** Academy Reg Service constuctor: " + this.timeStamp);
	}

    sortingHat( dob: string )
    {
    	let team       = '';
    	let now        = new Date();
    	let thisyear   = now.getFullYear();
    	let birthdate  = new Date(dob);
    	let birthyear  = birthdate.getFullYear();
    	let birthday   = birthdate.getDay();
    	let age        = thisyear - birthyear;
    	let birthmonth = birthdate.getMonth() + 1;  /* 0-11 so add 1 */
    	let thismonth  = now.getMonth() + 1;
    	let thisday    = now.getDay();

    	if ( (thismonth > birthmonth) || ((thismonth === birthmonth) && (thisday >= birthday)) )
    	{
    		age++; /* add an extra year if it has gone past the birthday */
    	}

    	switch ( age )
    	{
	    	case 10     : team = 'U11'; break;
	    	case 9      : team = 'U10'; break;
	    	case 8      : team = 'U9';  break;
	    	case 7      : team = 'U8';  break;
	    	case 6      : team = 'U7';  break;
	    	case 5      : 
	    	case 4      : team = 'U6';  break;
	    	     default: team = 'Unknown'; break;
    	}

    	return team;
    }

  calculateTotalCost()
	{
    this.lg$.log( "### Single Term: " + this.regData.getHalfterm() );
    this.lg$.log( "### Second child: " + this.regData.getSecondchild() );
    if( this.regData.getSecondchild() )
      this.payment = this.regData.getHalfterm() ? '60' : '120';
    else
		  this.payment = this.regData.getHalfterm() ? '70' : '140';
	}

  payPal()
	{
		this.lg$.log("[AcademyRegistrationService]-> payPal()");
		let body    = JSON.stringify({amount:'110', currency_code: 'EUR'});
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

    // (1) Convert the array of values to a Mmeber object
    this.convertToMember();

    // (2) Store the Member object as a cookie so we can use it to send the
    //     confirmation email to the user when we return from PayPal
    this.saveMemberCookie(this.member);

    // (3) Store the new member in the db
    this.storeDetails( this.member );

    // (4) Calculate the cost and redirec to PayPal for payment
    this.lg$.log("    |- Calling http post to PayPal..");

    let loc = '';
    if ( this.regData.getHalfterm() === true ) /* Single Term */
    {
      if ( this.regData.getSecondchild() === true ) /* Second child */
      {
        this.lg$.log("Transferring to PayPal to pay €60...");
        loc = 'https://www.paypal.com/cgi-bin/webscr?' +
            'cmd=_s-xclick&' +
            'hosted_button_id=3KNTPZ3NP7EBN'; // €60
      }
      else
      {
        this.lg$.log("Transferring to PayPal to pay €70...");
        loc = 'https://www.paypal.com/cgi-bin/webscr?' +
            'cmd=_s-xclick&' +
            'hosted_button_id=GCXHLWUZ3X9MJ'; // €70
      }

    } else
    {

      if ( this.regData.getSecondchild() === true ) /* Second child */
      {
        this.lg$.log("Transferring to PayPal to pay €120...");
        loc = 'https://www.paypal.com/cgi-bin/webscr?' +
            'cmd=_s-xclick&' +
            'hosted_button_id=D89LP4FLV3DKY'; // €120
      }
      else
      {
        this.lg$.log("Transferring to PayPal to pay €140...");
        loc = 'https://www.paypal.com/cgi-bin/webscr?' +
            'cmd=_s-xclick&' +
            'hosted_button_id=SYRJF6N5A488G'; // €140
      }

    }

    window.location.href = loc;

    // (5) Send the confirmation email to the person
    this.sendEmailConfirmation( this.member );

    this.lg$.log("********* BACK IN PAYPAL METHOD *********")
	}

	storeDetails( data: Member )
	{
    this.lg$.log("-> storeDetails()")
		this.logRegValues( data );

		var url = this.com$.getHome();
		this.lg$.log("  |- home set to: " + url);

		let headers = new Headers();
	  headers.append('Content-Type', 'application/json');
	  let options = new RequestOptions({ headers: headers });

	  this.lg$.log("  |- posting registration to server..[" + url + 'academyregistration' + "]");
		this._http.post(  url + 'academyregistration',
				              data, options )
              			.subscribe(
                	            	data  => this.lg$.log("  POST of academy registration successfull"),
                	            	error => this.handleError(error),
                	            	()    => this.lg$.log("  Saved academy registration to db successfull")
                              );
    this.lg$.log("<- storeDetails()")
	}

	convertToMember()
	{
		this.lg$.log("    |- ->convertToMember()");
		this.member.name         = this.regData.firstname + " " + this.regData.lastname;
		this.member.address      = this.regData.getAddress();
		this.member.phone        = this.regData.getPhone1();
		this.member.phone2       = this.regData.getPhone2();
		this.member.dob          = this.regData.getDob();
		this.member.email        = this.regData.getEmail();
		this.member.amount       = this.payment;
		this.member.receiptid    = "";                                                    // TODO: generate this
		this.member.team         = 0;                                                     // TODO: this.sortingHat();
		this.member.team2        = 0;
		this.member.team3        = 0;
		this.member.position     = 0;
		this.member.position2    = 0;
		this.member.position3    = 0;
		this.member.lid          = 0;
		this.member.favteam      = '';
		this.member.favplayer    = '';
		this.member.sappears     = 0;
		this.member.sassists     = 0;
		this.member.sgoals       = 0;
		this.member.photo        = 'assets/img/Players/default.png';
		this.member.achievements = '';
		this.member.status       = '';
		this.member.academyinfo  = "Registration Date: " +                                /* Registration Date */
		                            this.regData.getRegdate() + ", " +
			                          "Mother: " +  /* Mother's name */
		  						              this.regData.getMotherName() + ", " +
		  						              "Father: " +  /* Father's name */
								                this.regData.getFatherName() + ", " +
								                "Allergies: " +   /* Allergy information */
								                this.regData.getAllergies() + ", " +
								                "Asthma: " +   /* Asthma */
								                this.regData.getAsthma() + ", " +
								                "Diabetes: " +   /* Diabetes */
								                this.regData.getDiabetes() + ", " +
								                "Medication: " +   /* Medication */
								                this.regData.getMedication() + ", " +
								                "Notes: " +  /* Notes */
								                this.regData.getNotes();

		this.logMember();
		this.lg$.log("    |- <-convertToMember()");
	}

	sendEmailConfirmation( currMember : Member )
	{
    //let currMember : Member = this.getMemberCookie();
		this.lg$.log("[AcademyRegistrationService]-->sendEmailConfirmation()..to [" + currMember.email + "]");
		var url = this.com$.getHome();

		let headers = new Headers();
	  headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    // Send the confirmation email
		return this._http.post(url + 'confirmregistration',
				currMember, options )
    			.subscribe(
    	            	data  => this.lg$.log("Confirmation email sent successfull"),
    	            	error => this.lg$.log("===> Error sending confirmation email: " + error),
    	            	()    => this.lg$.log(" <=== Confirmation email sent successfull <====")
    	            );
	}

	handleError(error: any)
	{
		this.lg$.log("===> Error posting academy registration to server: " + error);
		this.logValues();
	}

  logRegValues(member: Member)
	{
    this.lg$.log( "->logRegValues()");
		this.lg$.log( "  |- ACADEMY REGISTRATION: ");
		this.lg$.log( '  |- Name: ' + member.name );
    this.lg$.log( '  |- Address: ' + member.address );
		this.lg$.log( '  |- Email: ' + member.email );
		this.lg$.log( '  |- Date of Birth: ' + member.dob );
		this.lg$.log( '  |- Phone1: ' + member.phone );
		this.lg$.log( '  |- Phone2: ' + member.phone2 );
		this.lg$.log( '  |- Academy Info: ' + member.academyinfo );
    this.lg$.log( "<-logRegValues()");
  }

	logValues()
	{
    this.lg$.log( "->logValues()");
		this.lg$.log( "  |- ACADEMY REGISTRATION: ");
		this.lg$.log( '  |- First name: ' + this.regData.getFirstname() );
    this.lg$.log( '  |- Last name: ' + this.regData.getLastname() );
    this.lg$.log( '  |- Address: ' + this.regData.getAddress() );
		this.lg$.log( '  |- Email: ' + this.regData.getEmail() );
		this.lg$.log( '  |- Date of Birth: ' + this.regData.getDob() );
		this.lg$.log( '  |- Phone1: ' + this.regData.getPhone1() );
		this.lg$.log( '  |- Phone2: ' + this.regData.getPhone2() );
		this.lg$.log( '  |- Allergies: ' + this.regData.getAllergies() );
		this.lg$.log( '  |- Asthma: ' + this.regData.getAsthma() );
		this.lg$.log( '  |- Diabetes: ' + this.regData.getDiabetes() );
		this.lg$.log( '  |- Medication: ' + this.regData.getMedication() );
		this.lg$.log( '  |- Notes: ' + this.regData.getNotes() );
		this.lg$.log( '  |- Reg Date: ' + this.regData.getRegdate() );
		this.lg$.log( '  |- Mother: ' + this.regData.getMotherName() );
		this.lg$.log( '  |- Father: ' + this.regData.getFatherName() );
		this.lg$.log( '  |- Half Term: ' + this.regData.getHalfterm() );
		this.lg$.log( '  |- Second Child: ' + this.regData.getSecondchild() );
		this.lg$.log( '  |- Third Child: ' + this.regData.getThirdchild() );
		this.lg$.log( '  |- Gen Consent: ' + this.regData.getGeneralconsent() );
    this.lg$.log( '  |- Pic Consent: ' + this.regData.getPictureconsent() );
    this.lg$.log( "<-logValues()");
	}

	logMember()
	{
    this.lg$.log( "->logMember()");
		this.lg$.log("    | ->logMember()");
		this.lg$.log("    | -- Name: " + this.member.name );
		this.lg$.log("    | -- Address: " + this.member.address );
		this.lg$.log("    | -- Phone: " + this.member.phone );
		this.lg$.log("    | -- Phone2: " + this.member.phone2 );
		this.lg$.log("    | -- dob: " + this.member.dob );
		this.lg$.log("    | -- email: " + this.member.email );
		this.lg$.log("    | -- Amount: " + this.member.amount );
		this.lg$.log("    | -- ReceiptId: " + this.member.receiptid );
		this.lg$.log("    | -- Team: " + this.member.team );
		this.lg$.log("    | -- Team2: " + this.member.team2 );
		this.lg$.log("    | -- Team3: " + this.member.team3 );
		this.lg$.log("    | -- Position: " + this.member.position );
		this.lg$.log("    | -- Position2: " + this.member.position2 );
		this.lg$.log("    | -- Position3: " + this.member.position3 );
		this.lg$.log("    | -- LeagueId: " + this.member.lid );
		this.lg$.log("    | -- Fav Team: " + this.member.favteam );
		this.lg$.log("    | -- Fav Player: " + this.member.favplayer );
		this.lg$.log("    | -- Appears: " + this.member.sappears );
		this.lg$.log("    | -- Assists: " + this.member.sassists );
		this.lg$.log("    | -- Goals: " + this.member.sgoals );
		this.lg$.log("    | -- Photo: " + this.member.photo );
		this.lg$.log("    | -- Achievements: " + this.member.achievements );
		this.lg$.log("    | -- Status: " + this.member.status );
		this.lg$.log("    | -- AcademyInfo: " + this.member.academyinfo );
    this.lg$.log( "<-logMember()");
  }

  tst2_payPal()
	{
    this.lg$.log("[AcademyRegistrationService]-> tst_payPal()");
    this.convertToMember();
    this.saveMemberCookie(this.member);
    window.location.href = 'http://localhost:4200/#/success';
    return;

		let body    = JSON.stringify({amount:'110', currency_code: 'EUR'});
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

	    this.lg$.log("    |- Storing registration details to server..");
	    this.convertToMember();
	    //this.storeDetails( this.member );

	    this.lg$.log("    |- Calling http post to PayPal..");

	    let loc = '';

      this.lg$.log("Transferring to PayPal for testing...");
      loc = 'https://www.paypal.com/cgi-bin/webscr?' +
          'cmd=_s-xclick&' +
          'hosted_button_id=9CQB2K78DC5DJ'; // €00.01

      window.location.href = loc;

      this.lg$.log("******** BACK FROM PAYPAL in tst_payPal() !! *********");
      console.log("******** BACK FROM PAYPAL in tst_payPal() !! *********");
  }

  tst_payPal()
	{
		this.lg$.log("[AcademyRegistrationService]-> tst_payPal()");
		let body    = JSON.stringify({amount:'110', currency_code: 'EUR'});
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

    // (1) Convert the array of values to a Mmeber object
    this.convertToMember();

    // (2) Store the Member object as a cookie so we can use it to send the
    //     confirmation email to the user when we return from PayPal
    this.saveMemberCookie(this.member);

    // (3) Calculate the cost and redirec to PayPal for payment
    this.lg$.log("    |- Calling http post to PayPal..");

    let loc = '';
    if ( this.regData.getHalfterm() === true ) /* Single Term */
    {
      if ( this.regData.getSecondchild() === true ) /* Second child */
      {
        this.lg$.log("Transferring to PayPal to pay €60...");
        loc = 'https://www.paypal.com/cgi-bin/webscr?' +
            'cmd=_s-xclick&' +
            'hosted_button_id=9CQB2K78DC5DJ'; // €60
      }
      else
      {
        this.lg$.log("Transferring to PayPal to pay €70...");
        loc = 'https://www.paypal.com/cgi-bin/webscr?' +
            'cmd=_s-xclick&' +
            'hosted_button_id=9CQB2K78DC5DJ'; // €70
      }

    } else
    {

      if ( this.regData.getSecondchild() === true ) /* Second child */
      {
        this.lg$.log("Transferring to PayPal to pay €120...");
        loc = 'https://www.paypal.com/cgi-bin/webscr?' +
            'cmd=_s-xclick&' +
            'hosted_button_id=9CQB2K78DC5DJ'; // €120
      }
      else
      {
        this.lg$.log("Transferring to PayPal to pay €140...");
        loc = 'https://www.paypal.com/cgi-bin/webscr?' +
            'cmd=_s-xclick&' +
            'hosted_button_id=9CQB2K78DC5DJ'; // €140
      }

    }
    window.location.href = loc;

    // (2) Store the new member in the db
    this.storeDetails( this.member );

    // (3) Send the confirmation email to the person
    this.sendEmailConfirmation( this.member );

    this.lg$.log("********* BACK IN PAYPAL METHOD *********")
	}

  private saveMemberCookie(member : Member)
  {
		if(member) {
      let mem = JSON.stringify(member);
		  localStorage.setItem('member-cookie', mem);
		  this.lg$.log("Member Cookie: " + member );
    }
  }

  public getMemberCookie(): Member
  {
    this.lg$.log("Retrieved member cookie: " + localStorage.getItem('member-cookie'));
    let strMember      = localStorage.getItem('member-cookie');
    let member: Member = JSON.parse(strMember);
    return member;
  }

}

