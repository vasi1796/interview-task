import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent {
  constructor(private location: Location){}

  routeBack() {
    this.location.back()
  }
}
