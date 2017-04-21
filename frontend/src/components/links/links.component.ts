/**
 * Created by odalybr on 08/04/2016.
 */
import { Component } from '@angular/core';

@Component({
  template: require('./links.component.html'),
  styles: [ require('./links.component.css').toString() ]
})

export class LinksComponent {
  private cdslImage = require("../../assets/img/links/CDSL_Crest.jpg");
  private csslImage = require("../../assets/img/links/cssl.jpeg");
  private faiImage = require("../../assets/img/links/fai-crest.png");

}
