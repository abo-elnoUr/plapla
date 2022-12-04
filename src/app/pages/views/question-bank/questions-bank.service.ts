import { IGetQuestionById } from './../../../models/questions-bank';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IQuestionBankResponse } from 'src/app/models/questions-bank';


@Injectable({
  providedIn: 'root'
})
export class QuestionsBankService {

  constructor(private _http:HttpClient) { }

  getQuestions(filter) {
    return this._http.post<IQuestionBankResponse>(`${environment.API_ROOT}/api/QuestionsBank/GetQuestions`, filter);
  }
  addQuestion(question)
  {
    return this._http.post(`${environment.API_ROOT}/api/QuestionsBank/Create`, question)
  }

  delete(id)
  {
    return this._http.delete(`${environment.API_ROOT}/api/QuestionsBank/Delete/${id}`);
  }
  getQuestionById(id: string)
  {
    return this._http.get<IGetQuestionById>(`${environment.API_ROOT}/api/QuestionBank/GetById/${id}`);
  }
  editQuestion(question: IGetQuestionById)
  {
    return this._http.put(`${environment.API_ROOT}/api/QuestionBank/Update`, question);
  }
}
