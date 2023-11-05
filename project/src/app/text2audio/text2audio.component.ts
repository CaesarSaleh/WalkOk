import { Component } from '@angular/core';
import {TranscriptionService} from '../transcription.service';
@Component({
  selector: 'app-text2audio',
  templateUrl: './text2audio.component.html',
  styleUrls: ['./text2audio.component.css']
})
export class Text2audioComponent {
  constructor(private transcriptionService: TranscriptionService) { }

  public async speech2audio() {
    this.transcriptionService.speech2audio()
  }
  
}
