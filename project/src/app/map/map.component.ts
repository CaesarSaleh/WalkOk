import { environment } from '../../environments/environment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  // private map: mapboxgl.Map;

  ngOnInit() {
    // Initialize the Mapbox map
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map', // HTML element ID to render the map
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [-79.38, 43.65], // Initial center of the map (longitude, latitude)
      zoom: 10 // Initial zoom level
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  }
}