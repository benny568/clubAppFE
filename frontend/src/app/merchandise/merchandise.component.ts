import { Component } from '@angular/core';

@Component({
  templateUrl: './merchandise.component.html',
  styleUrls: ['./merchandise.component.css']
})

export class MerchandiseComponent {
    public sponsorImage = "../../assets/img/merchandise/sponsor.png";
    items: [{name: string, image: string, description: string, width: string, height: string}];

    ngOnInit() {
        /* this.items = [
            {
                name: "Shorts",
                image: "../../assets/img/merchandise/shorts.png",
                description: "Kids 11.50E (YXS-XXS), Adult 12.50E (XS-S-M-L-XL)",
                width: "300",
                height: "300"
            },
            {
                name: "Socks",
                image: "../../assets/img/merchandise/socks.png",
                description: "10E Kids(below 4), Junior(4-6.5), Adult(7.5-11)",
                width: "300",
                height: "300"
            },
            {
                name: "Beanie",
                image: "../../assets/img/merchandise/beanie.png",
                description: "One Size 12E",
                width: "300",
                height: "300"
            },
            {
                name: "Combo 1",
                image: "../../assets/img/merchandise/combo1.png",
                description: "Kids 25E (YXS-XXS), Adult 30E (XS-S-M-L-XL)",
                width: "520",
                height: "300"
            },
            {
                name: "Combo 2",
                image: "../../assets/img/merchandise/combo2.png",
                description: "Kids 45E (YXS-XXS), Adult 55E (XS-S-M-L-XL)",
                width: "700",
                height: "300"
            } 
        ];*/
    }

}

