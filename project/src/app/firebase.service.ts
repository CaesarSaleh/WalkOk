import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Marker } from './map';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public firebaseAuth: AngularFireAuth, public firestore: AngularFirestore, public firestorage:AngularFireStorage) {}
  async test(){
    this.firestore.collection('test').doc('test').get().subscribe((doc) => {
      console.log(doc.data())
    })
  }
  // TODO: Write the database methods to here for Markers CRUD
  async createMarker(markerData: Marker) {
    return this.firestore.collection('markers').add(markerData);
  }

  async getMarkers() {
    this.firestore.collection('markers').valueChanges().subscribe((data) => {
      return data;
    });
  }
}
