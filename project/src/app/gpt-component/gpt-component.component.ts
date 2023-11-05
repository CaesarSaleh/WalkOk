import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gpt-component',
  templateUrl: './gpt-component.component.html',
  styleUrls: ['./gpt-component.component.css']
})
export class GptComponentComponent implements OnInit {
  queryFormGroup!: FormGroup;
  text: String = "classify the following text as whether the text is implying luring kids to cause harm to them(answer yes if it's trying to lure them):  "
  messages = [{ role: 'system', content: this.text }];
  result: any;
  analysis: String = '';
  requestCount = 0; // Initialize the request count to 0

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.handleAskGPT();
  }

  handleAskGPT() {
    this.requestCount++; // Increment the request count
    console.log('Request Count:', this.requestCount); // Log the request count

    var url = 'https://api.openai.com/v1/chat/completions';
    var httpHeaders = new HttpHeaders().set(
      'Authorization',
      'Bearer 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'
    );

    var payload = {
      model: 'gpt-3.5-turbo',
      messages: this.messages
    };

    this.httpClient.post(url, payload, { headers: httpHeaders }).subscribe({
      next: (resp) => {
        this.result = resp;
        console.log(this.result.choices[0].message.content); // Log the result after the HTTP request is completed
        this.analysis = this.result.choices[0].message.content
      },
      error: (err) => {
        // Handle errors
      }
    });
  }
}
