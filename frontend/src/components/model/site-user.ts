import { MyTeams } from './my-teams';

export /**
 * name
 */
class User {
    id:number;
    username:string;
    password:string;
    address:string;
    email:string;
    phone:string;
    dob:string;
    avatar:string;
    enabled:number;
    roles:ArrayLike<string>;
    authorities:ArrayLike<string>;
    permissions:MyTeams;

    constructor() {
        this.id = 0;
        this.username = '';
        this.password = '';
        this.address = '';
        this.email = '';
        this.phone = '';
        this.dob = '';
        this.avatar = '';
        this.enabled = 0;
        this.roles = [];
        this.authorities = [];

    }

}