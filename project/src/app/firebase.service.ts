import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';


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
}
