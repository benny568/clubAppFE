import { MyTeams } from './my-teams';

export /**
 * name
 */
class User {
    id      : number;
    name    : string;
    password: string;
    address : string;
    phone   : string;
    email   : string;
    dob     : string;
    avatar  : string;
    enabled : boolean;
    //roles   : ArrayLike<string>;
    // authorities:ArrayLike<string>;
    // permissions:MyTeams;

    constructor() {
        this.id       = 0;
        this.name     = '';
        this.password = '';
        this.address  = '';
        this.email    = '';
        this.phone    = '';
        this.dob      = '';
        this.avatar   = '';
        this.enabled  = false;
        //this.roles    = [];
        //this.authorities = [];

    }

}
