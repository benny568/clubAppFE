/**
 * Created by odalybr on 08/04/2016.
 */
import { Component } from '@angular/core';

// The following imports are to make webpack include the files
// in the build/release.
import '../../assets/img/links/CDSL_Crest.jpg';
import '../../assets/img/links/cssl.jpeg';
import '../../assets/img/links/fai-crest.png';

@Component({
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})

export class LinksComponent {
  public cdslImage = "../../assets/img/links/CDSL_Crest.jpg";
  public csslImage = "../../assets/img/links/cssl.jpeg";
  public faiImage = "../../assets/img/links/fai-crest.png";

}
