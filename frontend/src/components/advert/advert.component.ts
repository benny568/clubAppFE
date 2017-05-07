import { Component } from '@angular/core';

const pathToBg = "../../assets/img/avenueCrest.png";

@Component({
    selector: 'advert',
    templateUrl: './advert.component.html',
    styleUrls: ['./advert.component.css']
})

export class AdvertComponent {
    public backGround = "../../assets/img/fleadh/bg4.jpg";
}