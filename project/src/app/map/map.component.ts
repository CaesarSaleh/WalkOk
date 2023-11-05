import { environment } from '../../environments/environment';
import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { FirebaseService } from '../firebase.service';
import { Marker } from '../map';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map!: mapboxgl.Map;
  userLocation: any;
  
  // data
  public markers: Marker[] = []

  constructor(private firebaseService: FirebaseService) {
  }

  async ngOnInit() {
    // Initialize the Mapbox map
    this.initializeMap();
    this.firebaseService.initGetMarkers().subscribe((data) => {
      for (const jsonData of data) {
        const marker = new Marker(
          jsonData.title,
          jsonData.description,
          jsonData.latitude,
          jsonData.longitude
        );
        this.markers.push(marker);
      }
    });
    // const marker = new mapboxgl.Marker({
    //   color: "#FFFFFF",
    //   draggable: true
    //   }).setLngLat([30.5, 50.5])
    //   .addTo(map);
    
    this.markers.forEach((marker: Marker) => {
      const el = document.createElement('div');
      el.className = 'marker';

      new mapboxgl.Marker(el)
        .setLngLat([marker.longitude, marker.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(marker.title))
        .addTo(this.map);
    });

    this.map.on('load', () => {
      this.addMarkersToMap();
      this.addHeatMap();
    });

  }

  initializeMap() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-79.3,43.6], // Set to a default center
      zoom: 9 // Set to a default zoom level
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  

  addMarkersToMap() {
    console.log(this.markers);
    this.markers.forEach((marker: Marker) => {
      const el = document.createElement('div');
      el.className = 'marker';

      new mapboxgl.Marker(el)
        .setLngLat([marker.longitude, marker.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(marker.title))
        .addTo(this.map);
    });
  }
  dataObject = {
    "type": "FeatureCollection",
    "crs": {
      "type": "name",
      "properties": {
        "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
      }
    },
    "features": [
      {
        "type": "Feature",
        "properties": {
          "id": "feature1",
          "mag": 3.093643324822521,
          "time": 1507425650893
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -79.54487634295495,
            43.59579607426845,
            0.0
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "feature2",
          "mag": 3.610399406570914,
          "time": 1507425650893
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -79.427980292235,
            43.655228541601666,
            0.0
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "feature4",
          "mag": 4.554408653517734,
          "time": 1507425650893
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -79.4636244845789,
            43.75140271844349,
            0.0
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "feature5",
          "mag": 0.8099531464469634,
          "time": 1507425650893
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -79.37191258083531,
            43.88947822306219,
            0.0
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "feature6",
          "mag": 1.1441101800212528,
          "time": 1507425650893
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -79.39932872542637,
            43.523723108712744,
            0.0
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "feature32",
          "mag": 0.6997502325057725,
          "time": 1507425650893
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -79.50850974206857,
            43.70300891142794,
            0.0
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "feature33",
          "mag": 3.126650384881435,
          "time": 1507425650893
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -79.543986814668,
            43.701019755439475,
            0.0
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "feature34",
          "mag": 2.04473797219207,
          "time": 1507425650893
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -79.38150383673775,
            43.89991763156313,
            0.0
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "feature35",
          "mag": 4.976584955726107,
          "time": 1507425650893
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -79.5302583001846,
            43.63672095634308,
            0.0
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "feature36",
          "mag": 3.789867991389653,
          "time": 1507425650893
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -79.49161736697656,
            43.72823015647393,
            0.0
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "feature37",
          "mag": 1.5036156705777244,
          "time": 1507425650893
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -79.31140785076755,
            43.8724451351202,
            0.0
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "feature38",
          "mag": 0.5872074724019372,
          "time": 1507425650893
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -79.2427511588476,
            43.80923626281941,
            0.0
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "feature39",
          "mag": 4.832808825303216,
          "time": 1507425650893
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -79.60575174868835,
            43.689156439366975,
            0.0
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "feature40",
          "mag": 1.8198168190869874,
          "time": 1507425650893
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -79.47128539123514,
            43.82620316174835,
            0.0
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "feature41",
          "mag": 1.7677507432675372,
          "time": 1507425650893
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -79.53927723564632,
            43.79633731336125,
            0.0
          ]
        }
      }
    ]
  }
  addHeatMap() {
    this.map.addSource('earthquakes', {
      'type': 'geojson',
      'data': 'http://localhost:3000/coordinates'
      });
       
      this.map.addLayer(
      {
      'id': 'earthquakes-heat',
      'type': 'heatmap',
      'source': 'earthquakes',
      'maxzoom': 9,
      'paint': {
      // Increase the heatmap weight based on frequency and property magnitude
      'heatmap-weight': [
      'interpolate',
      ['linear'],
      ['get', 'mag'],
      0,
      0,
      6,
      1
      ],
      // Increase the heatmap color weight weight by zoom level
      // heatmap-intensity is a multiplier on top of heatmap-weight
      'heatmap-intensity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      0,
      1,
      9,
      3
      ],
      // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
      // Begin color ramp at 0-stop with a 0-transparancy color
      // to create a blur-like effect.
      'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(33,102,172,0)',
      0.2,
      'rgb(103,169,207)',
      0.4,
      'rgb(209,229,240)',
      0.6,
      'rgb(253,219,199)',
      0.8,
      'rgb(239,138,98)',
      1,
      'rgb(178,24,43)'
      ],
      // Adjust the heatmap radius by zoom level
      'heatmap-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      0,
      2,
      9,
      20
      ],
      // Transition from heatmap to circle layer by zoom level
      'heatmap-opacity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      7,
      1,
      9,
      0
      ]
      }
      },
      'waterway-label'
      );
       
      this.map.addLayer(
      {
      'id': 'earthquakes-point',
      'type': 'circle',
      'source': 'earthquakes',
      'minzoom': 7,
      'paint': {
      // Size circle radius by earthquake magnitude and zoom level
      'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      7,
      ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
      16,
      ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50]
      ],
      // Color circle by earthquake magnitude
      'circle-color': [
      'interpolate',
      ['linear'],
      ['get', 'mag'],
      1,
      'rgba(33,102,172,0)',
      2,
      'rgb(103,169,207)',
      3,
      'rgb(209,229,240)',
      4,
      'rgb(253,219,199)',
      5,
      'rgb(239,138,98)',
      6,
      'rgb(178,24,43)'
      ],
      'circle-stroke-color': 'white',
      'circle-stroke-width': 1,
      // Transition from heatmap to circle layer by zoom level
      'circle-opacity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      7,
      0,
      8,
      1
      ]
      }
      },
      'waterway-label'
      );
  }
}