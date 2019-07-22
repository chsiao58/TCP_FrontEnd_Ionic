import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Message } from '../component/chatpage/message';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class DirectMessageService {
  address = 'http://localhost:8080/DM/';
  messages: Observable<Message[]>;

  constructor(private http: HttpClient) { }
  getData(userId: number, fromId: number) {
    return this.http.get<Message[]>(this.address + '/' + fromId + '/' + userId);
  }

  postMessage(fromId: number, toId: number, message: string) {
    const toSend = new Message();
    toSend.userId = fromId;
    toSend.message = message;
    this.http.post(this.address + toId,
    toSend, httpOptions).subscribe(response => console.log(response));
  }
}
