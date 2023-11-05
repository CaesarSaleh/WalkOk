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
  lat!: number;
  lng!: number;

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
    this.map.on('load', () => {
      // this.addMarkersToMap();
      this.addHeatMap();
    });
    console.log(this.markers)
    this.markers.forEach((marker: Marker) => {
      const el = document.createElement('div');
      el.className = 'marker';

      new mapboxgl.Marker(el)
        .setLngLat([marker.longitude, marker.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(marker.title))
        .addTo(this.map);
    });

    // this.map.on('click', (event) => {
    //   new mapboxgl.Marker()
    //     .setLngLat([event.lngLat.lng, event.lngLat.lat])
    //     .addTo(this.map);
    // })

  }

  initializeMap() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-79.3,43.8], // Set to a default center
      zoom: 10 // Set to a default zoom level
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  makePin(title: string) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
       this.lat = position.coords.latitude;
       this.lng = position.coords.longitude;
       new mapboxgl.Marker()
        .setLngLat([this.lng, this.lat])
        .setPopup(new mapboxgl.Popup().setHTML(title))
        .addTo(this.map);
     }
     );
    }
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

  addHeatMap() {
    this.map.addSource('earthquakes', {
      'type': 'geojson',
      'data': 'http://localhost:3000'
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
      'heatmap-opacity': {
        default: 1,
        stops: [
          [15, 1],
          [16, 0]
        ]
      }
      
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
      'circle-stroke-width': 0.3,
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