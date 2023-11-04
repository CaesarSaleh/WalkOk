import { Component } from '@angular/core';
import { AssemblyAI } from 'assemblyai';


@Component({
  selector: 'app-text2audio',
  templateUrl: './text2audio.component.html',
  styleUrls: ['./text2audio.component.css']
})

export class Text2audioComponent {
  // Input 
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function (stream) {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = function (event) {
        // Handle audio data here
      };
      mediaRecorder.start();
    })
    .catch(function (error) {
      console.error('Error accessing microphone:', error);
    });


  // Start by making sure the `assemblyai` package is installed.
  // If not, you can install it by running the following command:
  // npm install assemblyai


  const client = new AssemblyAI({
  apiKey: '650497f71e3a40ae8f1721d0d78b2840',
  });

  const FILE_URL =
  '';

  // You can also transcribe a local file by passing in a file path
  // const FILE_URL = './path/to/file.mp3';

  // Request parameters 
  const data = {
  audio_url: FILE_URL
  }

  const run = async () => {
  const transcript = await client.transcripts.create(data);
  console.log(transcript.text);
  };

  run();

  }


