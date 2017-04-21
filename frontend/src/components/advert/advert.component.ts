import { Component } from '@angular/core';

/*var bg = require("src/assets/img/fleadh/bg4.jpg");*/
const pathToBg = require("../../assets/img/avenueCrest.png");

@Component({
    selector: 'advert',
    template: require('./advert.component.html'),
    styles: [require('./advert.component.css').toString()]
})

export class AdvertComponent {
    private backGround = require("../../assets/img/fleadh/bg4.jpg");
}