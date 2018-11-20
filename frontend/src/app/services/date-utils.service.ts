import { Injectable } from '@angular/core';

@Injectable()
export class DateUtilsService {

  constructor() { }

 
  /**********************************************************
   * Name       : convertDate()
   * Description: Convert a Date type to the string value of
   *              dd-mm-yy as this is what the server expects
   * Scope    : Externally accessible
   * Params in: Date
   * Return   : The string format of the date.
   **********************************************************/
    public convertDateToString( dob: Date ): string
    {
      console.log("convertDateToString("+dob+")");
      let day:number   = dob.getUTCDate()+1;
      console.log("Day: "+day);
      let month:number = dob.getUTCMonth()+1;
      console.log("Month: "+month);
      let year:number  = dob.getUTCFullYear();
      console.log("Year: "+year);

      let birthday: string = (day < 10 ? ("0"+(day-1)) : (day-1)) + "-" + (month < 10 ? ("0"+month) : month ) + "-" +  year;
      // this.lg$.log("The date built is: " + birthday );
      // this.lg$.log("The day is: " + day );
      // this.lg$.log("The month is: " + month );

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
      console.log("commonService --> convertStringToDate("+dob+", "+"\""+format+"\""+", \""+delimitor+"\""+")")
      let format_parts: String[] = format.split("/", 3);
      let dateParts: String[] = dob.split(delimitor, 3);
      let day: number = 0;
      let month: number = 0;
      let year: number = 0;
      let i: number = 0;
      let date:Date = new Date();

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

    /**********************************************************
     * Name       : convertDateToSlashDelimitedString()
     * Description: Convert a Date type to the string value of
     *              dd-mm-yy as this is what the server expects
     * Scope    : Externally accessible
     * Params in: Date
     * Return   : The string format of the date.
     **********************************************************/
    public convertDateToSlashDelimitedString( dob: Date ): string
    {
      let day:number   = dob.getUTCDate()+1;
      let month:number = dob.getUTCMonth()+1;
      let year:number  = dob.getUTCFullYear();

      let sDate = (day < 10 ? ("0"+day) : day) + "/" + (month < 10 ? ("0"+month) : month ) + "/" +  year;
      // this.lg$.log("The date built is: " + birthday );
      // this.lg$.log("The day is: " + day );
      // this.lg$.log("The month is: " + month );

      return sDate;
    }

    /**********************************************************
     * Name       : convertDateToDashDelimitedString()
     * Description: Convert a Date type to the string value of
     *              dd-mm-yy as this is what the server expects
     * Scope    : Externally accessible
     * Params in: Date
     * Return   : The string format of the date.
     **********************************************************/
    public convertDateToDashDelimitedString( dob: Date ): string
    {
      let day:number   = dob.getUTCDate();
      let month:number = dob.getUTCMonth()+1;
      let year:number  = dob.getUTCFullYear();

      console.log("common service.convertDateToDashDelimitedString()...")

      let sDate = (day < 10 ? ("0"+day) : day) + "-" + (month < 10 ? ("0"+month) : month ) + "-" +  year;
      // this.lg$.log("The date built is: " + birthday );
      // this.lg$.log("The day is: " + day );
      // this.lg$.log("The month is: " + month );
      console.log("Returning a date of: " + sDate);

      return sDate;
    }

}
