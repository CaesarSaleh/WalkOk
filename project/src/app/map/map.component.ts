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
  @ViewChild('map')
  mapElement!: ElementRef;
  map!: mapboxgl.Map;
  
  // data
  source: any;
  markers: any;

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit() {
    // Initialize the Mapbox map
    // this.markers = this.firebaseService.getMarkers();
    // this.addMarkersToMap();
    this.initializeMap();
  }

  initializeMap() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: this.mapElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0], // Set to a default center
      zoom: 2 // Set to a default zoom level
    });
  }

  addMarkersToMap() {
    this.markers.forEach((marker: Marker) => {
      const el = document.createElement('div');
      el.className = 'marker';

      new mapboxgl.Marker(el)
        .setLngLat([marker.longitude, marker.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(marker.title))
        .addTo(this.map);
    });
  }
}