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
        console.log(this.result); // Log the result after the HTTP request is completed
      },
      error: (err) => {
        // Handle errors
      }
    });
  }
}
