import { MyTeams } from './my-teams';

export /**
 * name
 */
class User {
    userId  : number;
    name    : string;
    password: string;
    address : string;
    phone   : string;
    email   : string;
    dob     : string;
    avatar  : string;
    role    : string;
    permissions: string [];
    enabled : boolean;
    //roles   : ArrayLike<string>;
    // authorities:ArrayLike<string>;
    // permissions:MyTeams;

    constructor() {
        this.userId   = 0;
        this.name     = '';
        this.password = '';
        this.address  = '';
        this.email    = '';
        this.phone    = '';
        this.dob      = '';
        this.role     = '';
        this.avatar   = '';
        this.enabled  = false;
        //this.roles    = [];
        //this.authorities = [];

    }

}
