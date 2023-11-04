import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Marker } from './map';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public markers: Marker[] = []

  constructor(public firebaseAuth: AngularFireAuth, public firestore: AngularFirestore, public firestorage:AngularFireStorage) {}
  async test(){
    this.firestore.collection('markers').doc('YCkJP80NvDECk8j0amMk').get().subscribe((doc) => {
      console.log(doc.data())
    })
  }
  // TODO: Write the database methods to here for Markers CRUD

  async createMarker(markerData: Marker) {
    return this.firestore.collection('markers').add(markerData);
  }

  // this.firestoreService.getAllItems('your_collection_name').subscribe((data) => {
  //   this.items = data;
  // });
  getAllItems(collectionName: string): Observable<any[]> {
    return this.firestore.collection(collectionName).valueChanges();
  }
  async initGetMarkers() { 
    // this.firestore.collection('markers').doc('YCkJP80NvDECk8j0amMk').get().subscribe(doc => console.log(doc.data()))
    this.firestore.collection('markers').valueChanges().subscribe((doc) => 
    {

      // for (const key in person) {
      //   if (person.hasOwnProperty(key)) {
      //     console.log(`${key}: ${person[key]}`);
      //   }
      // }
      for (const marker in doc) {
        this.markers?.push(JSON.parse(marker))
      }
      
      // console.log(doc)
      console.log(this.markers);
      return this.markers;
      // for (marker: doc) {
      //   this.markers.append(Marker(marker[]))
      // }
    })
    // this.getAllItems('markers').subscribe((data) => {
    //   // console.log(data);
    //   return data;
    // });
    // const snapshot = await this.firestore.collection('markers').get()
    // return snapshot.docs.map(doc => doc.data());
  }

  // async getMarkers() {
  //   this.firestore.collection('markers').valueChanges().subscribe((data) => {
  //     return data;
  //   });
  // }
}
