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

  text: String = "Reply 1 if and only if the following is inappropriate as a conversation between a stranger grown adult and a child. give brief reasons:"

  messages = [{ role: 'system', content: this.text }];
  conversation: string = '';
  result: any;
  analysis: String = '';
  requestCount = 0; // Initialize the request count to 0

  constructor(private httpClient: HttpClient) {}

  
  ngOnInit(): void {
  }

  handleAskGPT(conversation: Conversation) {
    this.requestCount++; // Increment the request count
    console.log('Request Count:', this.requestCount); // Log the request count

    this.conversation = conversation.content;

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
    return this.analysis;
  }
}
