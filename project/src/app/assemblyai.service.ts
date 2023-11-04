import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';
import { AssemblyAI } from 'assemblyai';


@Injectable({
  providedIn: 'root'
})
export class AssemblyaiService {

  constructor() { }

  public async recordAndTranscribeAudio() {
    // Check if the browser supports the MediaRecorder API
    if ("MediaRecorder" in window) {
      try {
        // Access the user's microphone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // Create a MediaRecorder instance and configure it
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks: Blob[] = [];

        // Listen for data available events
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };

        // Listen for the stop event
        mediaRecorder.onstop = async () => {
          // Combine the audio chunks into a single Blob
          const audioBlob = new Blob(audioChunks);

          // Initialize the AssemblyAI client
          const client = new AssemblyAI({
            apiKey: "650497f71e3a40ae8f1721d0d78b2840",
          });

          // Request parameters
          const data = {
            audio: audioBlob,
            audio_url:'',
          }

          try {
            // Submit the audio for transcription
            const transcript = await client.transcripts.create(data);
            console.log('Transcription:', transcript);
          } catch (error) {
            console.error('Error transcribing audio:', error);
          }
        };

        // Start recording
        mediaRecorder.start();

        // Stop recording after a certain time (e.g., 5 seconds)
        setTimeout(() => {
          mediaRecorder.stop();
        }, 3000);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    } else {
      console.error("MediaRecorder not supported in this browser.");
    }
  }
}