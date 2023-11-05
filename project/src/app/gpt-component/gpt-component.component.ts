import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

interface Conversation {
  content: string;
}

@Component({
  selector: 'app-gpt-component',
  templateUrl: './gpt-component.component.html',
  styleUrls: ['./gpt-component.component.css']
})
export class GptComponentComponent implements OnInit {
  queryFormGroup!: FormGroup;
  text: String = "Please don't say hi at me. AND say 1 if what I said is weird and 0 if not."
  messages = [{ role: 'system', content: this.text }];
  result: any;
  analysis: String = '';
  requestCount = 0; // Initialize the request count to 0

  constructor(private httpClient: HttpClient) {}

  
  ngOnInit(): void {
  }

  handleAskGPT(conversation: Conversation) {
    this.requestCount++; // Increment the request count
    console.log('Request Count:', this.requestCount); // Log the request count

    this.text = this.text + conversation.content;

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
    // return this.analysis;
  }
}
