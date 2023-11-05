import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AssemblyAI } from 'assemblyai';
  // Import the functions you need from the SDKs you need
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';




@Injectable({
  providedIn: 'root'
})
export class AssemblyaiService {

  constructor() { }

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
    const storage = getStorage();
    const audioFileRef = ref(storage, 'audio.m4a'); // Replace with the correct path to your audio file.

    getDownloadURL(audioFileRef)
    .then((url) => {
      // You now have the download URL of the audio file.
      // Use this URL to fetch the audio data.
      fetch(url)
        .then((response) => response.arrayBuffer())
        .then((audioData) => {
          // 'audioData' contains the binary audio data.
          // You can proceed to submit it to AssemblyAI.
          this.submitAudioToAssemblyAI(audioData);
        })
        .catch((error) => {
          console.error('Error fetching audio data:', error);
        });
    })
    .catch((error) => {
      console.error('Error getting download URL:', error);
    });
    
    
  }


  public async submitAudioToAssemblyAI(audioData: BlobPart) {
  // Initialize the AssemblyAI client with your API key
  const client = new AssemblyAI({
    apiKey: environment.assemblyAIKey,
  });

  // Create a Blob from the audio data
  const audioBlob = new Blob([audioData], { type: 'audio/m4a' });

  // Request parameters
  const data = {
    audio: audioBlob,
    audio_url: '', // This should be an empty string since you're uploading audio data.
  };

  // Submit the audio for transcription
  client.transcripts
    .create(data)
    .then((transcript) => {
      console.log('Transcription:', transcript);
    })
    .catch((error) => {
      console.error('Error transcribing audio:', error);
    });
  }

}
