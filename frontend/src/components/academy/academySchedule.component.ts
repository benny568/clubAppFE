import { Component } from '@angular/core';

@Component({
  template: require('./html/academySchedule.component.html'),
  styles: [ require('./css/academySchedule.component.css').toString() ]
})

export class AcademyScheduleComponent {
  private academyPoster = require("../../assets/img/academy/avenue-academy-15.1.jpg");
}
