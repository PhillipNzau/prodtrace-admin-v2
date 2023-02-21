import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ChatModel, ChatResModel } from '../../types/chatInterface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatDataService extends DefaultDataService<any> {
  listChatsUrl = environment.listChats;
  updateChatUrl = environment.updateChat;
  createChatUrl = environment.createChat;
  unRepliedChatUrl = environment.unRepliedChats;
  unReadResponseUrl = environment.unReadResponse;

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Chat', http, httpUrlGenerator);
  }

  override getAll(): Observable<any> {
    return this.http.get<ChatResModel>(this.listChatsUrl).pipe(
      map((chats: ChatResModel) => {
        return chats.results;
      })
    );
  }

  override add(chat: ChatModel): Observable<any> {
    return this.http.post<any>(this.listChatsUrl, chat).pipe(
      map((chats: ChatModel) => {
        return chats;
      })
    );
  }

  override update(chat: any): Observable<any> {
    const reply = {
      reply: chat.changes.reply,
      is_message_replied: chat.changes.is_message_replied,
    };

    return this.http.patch<any>(this.updateChatUrl + chat.id, reply).pipe(
      map((chats: any) => {
        return chats;
      })
    );
  }
}
