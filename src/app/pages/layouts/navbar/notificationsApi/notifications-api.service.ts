import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, Subject } from 'rxjs';

import * as signalR from "@aspnet/signalr";
import { HttpClient } from '@angular/common/http';
import { MessagesHandleErrorsService } from 'src/app/pages/views/messages/API/messages-handle-errors.service';
import { catchError } from 'rxjs/operators';

export interface Message {
  // TotalCount: Number
  // NotSeenCount: Number
  date: String
  discription: String
  id: String
  seen: Boolean
  studentIdentityId: String
  studentName: String
  title: String
}

export interface INotsDetails {
  totalCount: Number,
  notSeenCount: Number,
  notificationDetails: Array<Message>
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsApiService {

  private message$: Subject<Message>;
  private connection: signalR.HubConnection;

  constructor(private http: HttpClient, private handleError: MessagesHandleErrorsService) {
    this.message$ = new Subject<Message>();
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.API_ROOT}/hubs/Notification`)
      .build();
    this.connect();



  }
  private connect() {
    this.connection.start().catch(err => console.log(err));
    this.connection.on('PushNotification', (message) => {
      this.message$.next(message);
      console.log("signalR connected ✔")

    });
  }
  public getMessage(): Observable<Message> {

    return this.message$.asObservable();
  }
  public disconnect() {
    this.connection.stop();
    console.log("Disconnect")
  }


  getAllNotifications(pgSize, pgNo) {
    return this.http.post<INotsDetails>(`${environment.API_ROOT}/api/Notification/GetNotifications`, {
      "pageSize": pgSize, // Default
      "pageNo": pgNo // Default
    }).pipe(catchError(this.handleError.logError))
  }


  setNotifictionSeen(id) {
    return this.http.put(`${environment.API_ROOT}/api/Notification/NotificationSeen/${id}`, {}).pipe(catchError(this.handleError.logError))
  }



}
