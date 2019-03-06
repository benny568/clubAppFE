import { Injectable } from '@angular/core';

export enum LogType
{
  function,
  message
}

@Injectable()
export class LoggerService {

  constructor() { }

  loghdr = '';  // The header for this instance, to be used in each log message
  readonly functionPrefix = "|->";
  readonly messagePrefix  = "   |- ";
  readonly moduleSpace = 25;

  //trace(msg: any, type?:string) { /*if(process.env.DEBUG)*/ console.log( this.loghdr + msg); }
  log(msg: any, prefix?:string)   { console.log(this.loghdr + msg); }
  error(msg: any, prefix?:string) { console.error(this.loghdr + msg); }
  warn(msg: any, prefix?:string)  { console.warn(this.loghdr + msg); }

  trace(msg: any, type?:LogType) 
  {
      switch( type )
      {
        case LogType.function: // function call
          console.log( this.loghdr + this.functionPrefix + msg);
          break;
        case LogType.message: // function call
          console.log( this.loghdr + this.messagePrefix + msg);
          break;
        default:
          console.warn(this.loghdr + msg);
          break;
      }
  }

  /**********************************************************
   * Name       : setLogHdr()
   * Description: Sets up the correct indentation and header
   * 				information for the log messages.
   * Scope    : Internal
   * Params in:
   * Return   :
   **********************************************************/
  setLogHdr(logdepth: number, moduleName: string) {
    const indent = this.generateIndent( logdepth );
    console.log(indent + '--> Setting log header for [' + moduleName + ']');
    let   i           = 0;
    const depth       = logdepth * 4;
    let   hdr         = ' ' +  moduleName;

    if( moduleName.length > this.moduleSpace )
    {
      hdr = hdr.slice(0,this.moduleSpace-1)
    }
    else if( moduleName.length < this.moduleSpace )
    {
      let diff = this.moduleSpace - moduleName.length;
      for( let i=0; i<diff; i++ )
      {
        hdr += ' ';
      }
    }

    // Make sure the field width is the standard, pad if necessary

    // (1) Set the indentation according to the depth
    for ( i = 0; i < depth; i++ ) {
      hdr += ' ';
    }

    // (2) Add on call stack indicator
    // hdr += ' |-';

    this.loghdr = hdr;
  }

  generateIndent( spaces: number ) {
    let sIndent = '';  // Initialise the logging indent
      for ( let i = 0; i < spaces; i++ ) {
        sIndent += '    ';
      }

      return sIndent;
  }

}
