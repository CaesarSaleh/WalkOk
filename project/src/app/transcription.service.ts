// export audio to storage
import { Injectable } from '@angular/core';
// import { doc, getFirestore, onSnapshot } from '@angular/fire/firestore';
import { getStorage, ref, uploadBytes } from '@angular/fire/storage';
// http request
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observeOn } from 'rxjs';
import { GptComponentComponent } from './gpt-component/gpt-component.component';

interface Conversation {
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranscriptionService implements OnInit {
  storage: any;

  constructor(private http: HttpClient, private gpt: GptComponentComponent) { }

  ngOnInit() {
    this.sendRequestToServer();
  }

  sendRequestToServer() {
    const serverUrl = 'http://localhost:4000/upload'; // Replace with your server URL

    this.http.get(serverUrl).subscribe(
      (response: any) => {
        console.log('Response from server:', response);
        console.log(this.gpt.handleAskGPT(response));
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  public async speech2audio(): Promise<string> {
    // Access the user's microphone and record audio
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks: Blob[] = [];

    return new Promise<string>((resolve, reject) => {
      // Listen for data available events
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      // Listen for the stop event
      mediaRecorder.onstop = async () => {
        // Combine the audio chunks into a single Blob
        const audioBlob = new Blob(audioChunks, { type: 'audio/m4a' });
        const storage = getStorage();
        const storageRef = ref(storage, 'audio.m4a');

        // Convert Blob to Uint8Array
        const reader = new FileReader();
        reader.onload = (event) => {
          const arrayBuffer = event.target?.result as ArrayBuffer | null;
          if (arrayBuffer) {
            const uint8Array = new Uint8Array(arrayBuffer);

            // Upload the Uint8Array
            uploadBytes(storageRef, uint8Array)
              .then((snapshot) => {
                console.log('Uploaded Successfully');
              })
              .catch((err) => {
                console.error('Error uploading audio:', err);
              });
          }
        };

        reader.readAsArrayBuffer(audioBlob);
      };

      mediaRecorder.start();

      setTimeout(() => {
        mediaRecorder.stop();
      }, 20000);

      setTimeout(() => {
        const { spawn } = require('child_process');
        const pyProg = spawn('python', ["d:/Workspaces/hackathons/newhacks/WalkOk/project/src/app/flask_server/server.py"].concat());
        this.sendRequestToServer();
      }, 10000);
    })
  }
}
