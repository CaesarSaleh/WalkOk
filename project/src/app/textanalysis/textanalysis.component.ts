import { Component } from '@angular/core';
import { ChatGptService } from '../chat-gpt.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-textanalysis',
  templateUrl: './textanalysis.component.html',
  styleUrls: ['./textanalysis.component.css']
})
export class TextanalysisComponent {
  prompt: string = '';
  response: string = '';

  constructor(private chatGptService: ChatGptService) {}

  generateResponse() {
    this.chatGptService.generateResponse(this.prompt).subscribe((data: any) => {
      this.response = data.choices[0].text;
    });
  }
}
