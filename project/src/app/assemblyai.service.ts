import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AssemblyAI } from 'assemblyai';
  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from 'firebase/analytics';
import { getStorage, ref, uploadBytes, uploadString } from 'firebase/storage';


const firebaseConfig = {
apiKey: 'AIzaSyB0zZLSXd6CWUy3FL7pwktOTrXrhcfrgdc',
authDomain: 'walkok.firebaseapp.com',
projectId: 'walkok',
storageBucket: 'walkok.appspot.com',
messagingSenderId: '376219348185',
appId: '1:376219348185:web:aa2ffbd197bb1fcbbc22c8',
measurementId: 'G-HHL5K4PS32', // Optional if you have measurement ID
};

const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class AssemblyaiService {

  constructor() { }

// public async recordAndTranscribeAudio() {
//   // Check if the browser supports the MediaRecorder API
//   if ("MediaRecorder" in window) {
//     try {
//       // Access the user's microphone
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//       // Create a MediaRecorder instance and configure it
//       const mediaRecorder = new MediaRecorder(stream);
//       const audioChunks: Blob[] = [];

//       // Listen for data available events
//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunks.push(event.data);
//         }
//       };

//       // Listen for the stop event
//       mediaRecorder.onstop = async () => {
//         // Combine the audio chunks into a single Blob
//         const audioBlob = new Blob(audioChunks);
//         // Initialize the AssemblyAI client
//         const client = new AssemblyAI({
//           apiKey: "650497f71e3a40ae8f1721d0d78b2840"
//         });

//         // Request parameters
//         const data = {
//           audio: audioBlob,
//           audio_url:'',
//         }

//         try {
//           // Submit the audio for transcription
//           const transcript = await client.transcripts.create(data);
//           console.log('Transcription:', transcript);
//         } catch (error) {
//           console.error('Error transcribing audio:', error);
//         }
//       };

//       // Start recording
//       mediaRecorder.start();

//       // Stop recording after a certain time (e.g., 5 seconds)
//       setTimeout(() => {
//         mediaRecorder.stop();
//       }, 3000);
//     } catch (error) {
//       console.error('Error accessing microphone:', error);
//     }
//   } else {
//     console.error("MediaRecorder not supported in this browser.");
//   }
// }

  public async exportAudioToM4A(): Promise<string> {
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
      // Start recording
      mediaRecorder.start();

      // Stop recording after a certain time (e.g., 5 seconds)
      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000);
    });
  }

  public async startTranscription() {
    
  }
}
