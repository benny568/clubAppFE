import { Position } from './position'

export class Member {
	id:number;
    name:string;
    address:string;
    phone:string;
    phone2:string;
    email:string;
    dob:string;
    amount:string;
    paydate:string;
    receiptid:string;
    team:number;
    team2:number;
    team3:number;
    position:number;
    position2:number;
    position3:number;
    lid:number;
    favteam:string;
    favplayer:string;
    sappears:number;
    sassists:number;
    sgoals:number;
    photo:string;
    achievements:string;
    status:string;
    academyinfo:string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.address = '';
        this.phone = '';
        this.phone2 = '';
        this.email = '';
        this.dob = '';
        this.amount = '0';
        this.paydate = '';
        this.receiptid = '';
        this.team = 0;
        this.team2 = 0;
        this.team3 = 0;
        this.position = 0;
        this.position2 = 0;
        this.position3 = 0;
        this.lid = 0;
        this.favteam = '';
        this.favplayer = '';
        this.sappears = 0;
        this.sassists = 0;
        this.sgoals = 0;
        this.photo = '';
        this.achievements = '';
        this.status = '';
        this.academyinfo = '';
    }

}