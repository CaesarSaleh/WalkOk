import { Component } from '@angular/core';
import { AssemblyaiService } from '../assemblyai.service';

@Component({
  selector: 'app-text2audio',
  templateUrl: './text2audio.component.html',
  styleUrls: ['./text2audio.component.css']
})

export class Text2audioComponent {
  constructor(private assemblyaiService: AssemblyaiService) { }

  public startAudioRecordingAndTranscription() {
    this.assemblyaiService.recordAndTranscribeAudio();
  }
}


