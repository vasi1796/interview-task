import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LandRegistryTitle } from 'src/app/models/LandRegistryTitle';
import { ApiService } from 'src/app/services/api.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {
  titleId: string = ''
  landTitle: LandRegistryTitle | undefined = undefined
  @ViewChild('map', { static: true }) mapRef!: ElementRef

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private mapService: MapService
    ){
      this.activatedRoute.queryParams.subscribe(params => {
        this.titleId = params['id']
        this.apiService.getTableData().subscribe(data => {
          data.map(d => {
            if(d.title_no === this.titleId) {
              this.landTitle = d
              this.mapService.setView(this.landTitle?.x, this.landTitle?.y)
            }
          })
        })
      })
    }

  ngOnInit() {
    this.mapService.setTarget('map')
  }

  routeBack() {
    this.location.back()
  }
}
