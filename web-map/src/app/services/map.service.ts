import { Injectable } from '@angular/core';
import { Map, View } from 'ol';
import * as olLayer from 'ol/layer'
import { useGeographic } from 'ol/proj';
import * as olSource from 'ol/source'
import * as olProj from 'ol/proj'
import Feature from 'ol/Feature'
import * as olGeom from 'ol/geom'
import * as olStyle from 'ol/style'

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _map: Map

  get map (): Map {
    return this._map
  }

  get view (): View {
    return this._map.getView()
  }

  constructor() {
    useGeographic()
    this._map = new Map({
      layers: [
        new olLayer.Tile({
          source: new olSource.OSM({
            crossOrigin: 'anonymous'
          })
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 1,
      })
    })
  }

  setTarget (target: string | null) {
    this._map.setTarget('force a refresh')
    this._map.setTarget(target as any)
  }

  setView (lon:number, lat:number) {
    this.map.getView().setCenter([lon, lat]);
    this.map.getView().setZoom(17);
    var layer = new olLayer.Vector({
      source: new olSource.Vector({
          features: [
              new Feature({
                  geometry: new olGeom.Point([lon, lat])
              })
          ]
      }),
      style: new olStyle.Style({
        image: new olStyle.Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'https://openlayers.org/en/latest/examples/data/icon.png'
        })
      })
  });
  this.map.addLayer(layer);
  }

}
