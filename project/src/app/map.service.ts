// import { Injectable } from '@angular/core';
// import { environment } from '../environments/environment';
// // import { AngularFireDatabase, FirebaseListObservable } from 'angularfire/database';
// import { GeoJson } from './map';
// import * as mapboxgl from 'mapbox-gl';
// import { FirebaseService } from './firebase.service';

// @Injectable()
// export class MapService {

//   constructor(private db: FirebaseService) {
//     // Move access token to later part
//     // mapboxgl.accessToken = environment.mapbox.accessToken
//   }


//   getMarkers(): FirebaseListObservable<any> {
//     return this.db.getMarkers();
//   }

//   createMarker(markerData: mapboxgl.Marker) {
//     return this.db.createMarker(markerData);
//   }
//   // Implement delete later if need to
//   // removeMarker($key: string) {
//   //   return this.db.object('/markers/' + $key).remove()
//   // }

// }