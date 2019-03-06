import { Injectable } from '@angular/core';
import * as moment from 'moment';

enum DateStrBrand { }

export type DateStr = string & DateStrBrand;


@Injectable()
export class DateUtilsService {

  constructor() { }

  /**********************************************************
   * Name       : checkValidDateStr()
   * Description: Check if the string is in the correct format
   * Scope    : Externally accessible
   * Params in: Date
   * Return   : The string format of the date.
   **********************************************************/
  checkValidDateStr(str: string): str is DateStr {
    return str.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
  }

  /**********************************************************
   * Name       : toDateStr()
   * Description: Convert a Date type to the string value of
   *              dd-mm-yy as this is what the server expects
   * Scope    : Externally accessible
   * Params in: Date
   * Return   : The string format of the date.
   **********************************************************/
  toDateStr(date: Date | moment.Moment | string): DateStr {
    if (typeof date === 'string') {
      if (this.checkValidDateStr(date)) {
        return date;
      } else {
        throw new Error(`Invalid date string: ${date}`);
      }
    } else {
      const dateString = moment(date).format('YYYY-MM-DD');
      if (this.checkValidDateStr(dateString)) {
        return dateString;
      }
    }
    throw new Error(`Shouldn't get here (invalid toDateStr provided): ${date}`);
  }
  

  // Examples

  // const today = toDateStr(new Date());

  // const fourthOfJuly = toDateStr('2017-07-04');

  // fourthOfJuly === '2017-07-04'; // true

  // function formatDate(date: DateStr) {
  //   return moment(date).format('MM/DD/YY');
  // }

  // formatDate('foo'); // compile error

  // formatDate(toDateStr('foo')); // runtime error

  // formatDate(toDateStr('2017-07-04')); // 07/04/17
 
  /**********************************************************
   * Name       : convertDateToString()
   * Description: Convert a Date type to the string value of
   *              dd-mm-yy as this is what the server expects
   * Scope    : Externally accessible
   * Params in: Date
   * Return   : The string format of the date.
   **********************************************************/
  public convertDateToString( dob: Date ): string
  {
    if( !dob )
      return null;
      
    dob.setUTCHours(0,0,0); // Set the timezone to UTC
    console.log("convertDateToString("+dob+")");
    let day:number  = dob.getUTCDate();
    console.log("Day: "+day);
    let month:number = dob.getUTCMonth() + 1; // Month is zero based
    console.log("Month: "+month);
    let year:number  = dob.getUTCFullYear();
    console.log("Year: "+year);

    let birthday: string = (day < 10 ? ("0"+(day)) : (day)) + "-" + (month < 10 ? ("0"+month) : month ) + "-" +  year;
    console.log("The date built is: " + birthday );
    console.log("The day is: " + day );
    console.log("The month is: " + month );

    return birthday;
  }

  /**********************************************************
   * Name       : convertStringToDate()
   * Description: Convert a string type to a Date
   * Scope    : Externally accessible
   * Params in: Date
   * Return   : The Date representation of the string.
   **********************************************************/
  public convertStringToDate( dob: string, format: string, delimitor: string ): Date
  {
    console.log("DateUtilsService --> convertStringToDate("+dob+", "+"\""+format+"\""+", \""+delimitor+"\""+")")
    let format_parts: String[] = format.split("/", 3);
    let dateParts: String[] = dob.split(delimitor, 3);
    let day: number = 0;
    let month: number = 0;
    let year: number = 0;
    let i: number = 0;
    let date:Date = new Date();

    date.setUTCHours(0,0,0); // Set the timezone to UTC

    for( let part of format_parts )
    {
      console.log("Checking part["+part+"] and i is ["+i+"]");
      if( part === "dd" )
        day = i;
      else if( part === "mm" )
        month = i;
      else if( part === "yyyy" )
        year = i;
      i++;
    }

    console.log("Format of ("+format+") is: day["+day+"], month["+month+"], year["+year+"]");
    console.log("Day: " + dateParts[day] + ", month: " + dateParts[month] + ", year: " + dateParts[year] );

    date = new Date( Number(dateParts[year]), Number(dateParts[month])-1, Number(dateParts[day]) );

    console.log("Returning date of: " + date );

    return date;
  }

}
