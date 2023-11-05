import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentReference, DocumentSnapshot, QuerySnapshot } from '@angular/fire/compat/firestore';
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
  initGetMarkers(): Observable<any[]> {
    return this.firestore.collection('pins').valueChanges();
  }
  // async initGetMarkers() { 
    
  //   this.firestore.collection('markers').valueChanges().subscribe((data) => {
  //     console.log(data);
  //     return data;
  //   });
    // this.firestore.collection('markers').doc('YCkJP80NvDECk8j0amMk').get().subscribe(doc => console.log(doc.data()))
    // const querySnapshot = await this.firestore.collection('markers').get();
    // querySnapshot.forEach((doc: DocumentSnapshot) => {
    //   console.log(doc.id());
    //   // for (const marker in doc) {
    //   //   this.markers?.push(JSON.parse(marker))
    //   // }
    // });
    // return this.markers;
  // }
}
