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
  messages = [{ role: 'system', content: 'Hi' }];
  result: any;
  requestCount = 0; // Initialize the request count to 0

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.handleAskGPT();
    console.log(this.result)
    console.log(this.requestCount)
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
      },
      error: (err) => {
        // Handle errors
      }
    });
  }
}
