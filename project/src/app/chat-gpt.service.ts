import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {
  private apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

  constructor(private http: HttpClient) {}

  generateResponse(prompt: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', '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');

    const body = {
      prompt,
      max_tokens: 10, 
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
