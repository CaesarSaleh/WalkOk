import { Injectable } from '@angular/core';

// Import the Google Cloud Speech-to-Text client library
const speech = require('@google-cloud/speech');

@Injectable({
  providedIn: 'root',
})
export class AssemblyaiService {
  constructor() {}

  public async startTranscription() {
    // Access the user's microphone and record audio
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks: Blob[] = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

      // Convert the Blob to ArrayBuffer
      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioData = new Uint8Array(arrayBuffer);

      try {
        const transcription = await this.transcribeAudio(audioData);
        console.log('Transcription result:', transcription);
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
  }

  private async transcribeAudio(audioData: Uint8Array): Promise<string> {
    const client = new speech.SpeechClient();

    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    };

    const audio = {
      content: Buffer.from(audioData).toString('base64'), // Convert audio data to base64
    };

    const request = {
      audio: audio,
      config: config,
    };

    try {
      const [response] = await client.recognize(request);
      const transcription = response.results
        .map((result: { alternatives: { transcript: any; }[]; }) => result.alternatives[0].transcript)
        .join('\n');
      return transcription;
    } catch (error) {
      throw error;
    }
  }
}




// import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment.development';
// import { AssemblyAI } from 'assemblyai';
//   // Import the functions you need from the SDKs you need
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';



// @Injectable({
//   providedIn: 'root'
// })
// export class AssemblyaiService {

//   constructor() { }

//   public async exportAudioToM4A(): Promise<string> {
//     // Access the user's microphone and record audio
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     const mediaRecorder = new MediaRecorder(stream);
//     const audioChunks: Blob[] = [];

//     return new Promise<string>((resolve, reject) => {
//       // Listen for data available events
//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunks.push(event.data);
//         }
//       };

//     // Listen for the stop event
//     mediaRecorder.onstop = async () => {
//       // Combine the audio chunks into a single Blob
//       const audioBlob = new Blob(audioChunks, { type: 'audio/m4a' });
//       const storage = getStorage();
//       const storageRef = ref(storage, 'audio.m4a');

//       // Convert Blob to Uint8Array
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const arrayBuffer = event.target?.result as ArrayBuffer | null;
//         if (arrayBuffer) {
//           const uint8Array = new Uint8Array(arrayBuffer);

//           // Upload the Uint8Array
//           uploadBytes(storageRef, uint8Array)
//             .then((snapshot) => {
//               console.log("djfskl;djfdkljfwkl"); // Print the audio data to the console for debugging purposes.

//               console.log('Uploaded Successfully');
//             })
//             .catch((err) => {
//               console.error('Error uploading audio:', err);
//             });
//         }
//       };

//       reader.readAsArrayBuffer(audioBlob);
//     };
//       // Start recording
//       mediaRecorder.start();

//       // Stop recording after a certain time (e.g., 5 seconds)
//       setTimeout(() => {
//         mediaRecorder.stop();
//       }, 5000);
//     });

//   }

//   // public async startTranscription() {
//   //   const storage = getStorage();
//   //   const audioFileRef = ref(storage, 'audio.m4a'); // Replace with the correct path to your audio file.

//   //   getDownloadURL(audioFileRef)
//   //   .then((url) => {
//   //     // You now have the download URL of the audio file.
//   //     // Use this URL to fetch the audio data.
//   //     fetch(url)
//   //       .then((response) => response.arrayBuffer())
//   //       .then((audioData) => {
//   //         // 'audioData' contains the binary audio data.
//   //         // You can proceed to submit it to AssemblyAI.
//   //         this.submitAudioToAssemblyAI(audioData);
//   //       })
//   //       .catch((error) => {
//   //         console.error('Error fetching audio data:', error);
//   //       });
//   //   })
//   //   .catch((error) => {
//   //     console.error('Error getting download URL:', error);
//   //   });
    
    
//   // }
//   public async startTranscription() {
//     const storage = getStorage();
//     const audioFileRef = ref(storage, 'audio.m4a'); // Replace with the correct path to your audio file.
//     try {
//       const url = await getDownloadURL(audioFileRef);
//       console.log('Download URL:', url);

//       // Fetch the audio data and call the quickstart function
//       fetch(url)
//         .then(response => response.arrayBuffer())
//         .then(audioData => {          
//           return this.quickstart(new Uint8Array(audioData)); // Pass the audio data to quickstart
//         })
//         .then(transcription => {
//           // Handle the transcription result here
//           console.log('Transcription result:', transcription);
//         })
//         .catch(error => {
//           console.error('Error fetching audio data:', error);
//         });
//     } catch (error) {
//       console.error('Error getting download URL:', error);
//     }
//   }
//   public async quickstart(audioData: Uint8Array) {
//     const speech = require('@google-cloud/speech');
//     const client = speech.SpeechClient();
//     const config = {
//       encoding: 'LINEAR16',
//       sampleRateHertz: 16000,
//       languageCode: 'en-US',
//     };
//     const audio = {
//       content: audioData.toString(), // Convert binary audio data to base64
//     };
//     const request = {
//       audio: audio,
//       config: config,
//     };

//     try {
//       const [response] = await client.recognize(request);
//       const transcription = response.results
//         .map((result: { alternatives: { transcript: any; }[]; }) => result.alternatives[0].transcript)
//         .join('\n');
//       console.log(`Transcription: ${transcription}`);
//       return transcription;
//     } catch (error) {
//       console.error('Error recognizing audio:', error);
//       throw error;
//     }
//   }

  


//   // public async submitAudioToAssemblyAI(audioData: BlobPart) {
//   //   // Creates a client
//   //   const speech = require('@google-cloud/speech');

//   //   const client = new speech.SpeechClient();
//   //   // The path to the remote LINEAR16 file
//   //   const gcsUri = 'gs://walkok.appspot.com/audio.m4a';

//   //   // The audio file's encoding, sample rate in hertz, and BCP-47 language code
//   //   const audio = {
//   //     uri: gcsUri,
//   //   };
//   //   const config = {
//   //     encoding: 'LINEAR16',
//   //     sampleRateHertz: 16000,
//   //     languageCode: 'en-US',
//   //   };
//   //   const request = {
//   //     audio: audio,
//   //     config: config,
//   //   };

//   //   // Detects speech in the audio file
//   //   const [response] = await client.recognize(request);
//   //   const transcription = response.results
//   //     .map((result: { alternatives: { transcript: any; }[]; }) => result.alternatives[0].transcript)
//   //     .join('\n');
//   //   console.log(`Transcription: ${transcription}`);
  
//   // }

//   // public async submitAudioToAssemblyAI(audioData: BlobPart) {
//   // // Initialize the AssemblyAI client with your API key
//   // const client = new AssemblyAI({
//   //   apiKey: environment.assemblyAIKey,
//   // });

//   // // Create a Blob from the audio data
//   // const audioBlob = new Blob([audioData], { type: 'audio/m4a' });

//   // // Request parameters
//   // const data = {
//   //   audio: audioBlob,
//   //   audio_url: '', // This should be an empty string since you're uploading audio data.
//   // };

//   // // Submit the audio for transcription
//   // client.transcripts
//   //   .create(data)
//   //   .then((transcript) => {
//   //     console.log('Transcription:', transcript);
//   //   })
//   //   .catch((error) => {
//   //     console.error('Error transcribing audio:', error);
//   //   });
//   // }

// }
