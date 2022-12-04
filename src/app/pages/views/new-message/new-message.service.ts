
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from "rxjs/operators"
import { environment as env } from "@env/environment";
import { NewMessageErrosService } from './new-message-erros.service';

@Injectable({
  providedIn: 'root'
})
export class NewMessageService {


  constructor(private http: HttpClient, private handleError: NewMessageErrosService) { }

  // Get All Chat's

  getAllStudents() {

    return this.http.get(`${env.API_ROOT}/api/Student/GetStudents`).pipe(catchError(this.handleError.logError))

  }

  getChatHistoryById(id) {
    return this.http.get(`${env.API_ROOT}/api/Message/GetStudentChatHistory/${id}`).pipe(catchError(this.handleError.logError))

  }

  adminReplayToDtudent(messageData) {
    return this.http.post(`${env.API_ROOT}/api/Message/AdminReplay`, messageData).pipe(catchError(this.handleError.logError))
  }
}
