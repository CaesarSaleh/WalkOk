import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

          // Initialize the AssemblyAI client
          const AssemblyAI = require('assemblyai');
          const client = new AssemblyAI({
            apiKey: environment,
          });

          // Request parameters
          const data = {
            audio: audioBlob,
          }

          try {
            // Submit the audio for transcription
            const transcript = await client.transcribe.create(data);
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
        }, 5000);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    } else {
      console.error("MediaRecorder not supported in this browser.");
    }
  }
}
