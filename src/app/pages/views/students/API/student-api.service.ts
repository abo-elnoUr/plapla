import { Injectable, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from "rxjs/operators"
import { environment as env, environment } from "@env/environment";
import { StudentHandleErrorService } from './student-handle-error.service';
import { IStage } from 'src/app/helpers/_interfaces/stage';
import { IGrade } from 'src/app/helpers/_interfaces/grade';
import { IStudent, IStudentsObject } from 'src/app/helpers/_interfaces/student';
import { IExtraRequestResponse, ISubject, ISubjectFilterResponse } from 'src/app/helpers/_interfaces/subject';




interface IToggleActiveStudent {
  status: String
  statusFlag: Boolean
}


export interface IExtraRequest {
  "studentId": String,
  "subjectId": String,
  "requestCount": Number
}



@Injectable({
  providedIn: 'root'
})
export class StudentAPIService {





  constructor(private http: HttpClient, private handleError: StudentHandleErrorService) { }


  getAllStages() {
    return this.http.get<Array<IStage>>(`${env.API_ROOT}/api/Stage/GetAllStagesAdmin`).pipe(catchError(this.handleError.logError))
  }

  getGradesByStageId(stageId) {
    return this.http.get<Array<IGrade>>(`${env.API_ROOT}/api/Grade/GetGradesByStageIdAdmin/${stageId}`).pipe(catchError(this.handleError.logError))
  }


  getAllStudents(filter) {

    return this.http.post<Array<IStudent>>(`${env.API_ROOT}/api/Student/GetStudents`, filter).pipe(catchError(this.handleError.logError))

  }


  getStudentsByFilter(filterData) {
    return this.http.post<IStudentsObject>(`${env.API_ROOT}/api/Student/GetStudents`, filterData).pipe(catchError(this.handleError.logError))
  }

  paginationStudents(num, size) {
    return this.http.post<IStudentsObject>(`${env.API_ROOT}/api/Student/GetStudents`, {
      "studentName": "",
      "pageNo": num,
      "pageSize": size
    }).pipe(catchError(this.handleError.logError))
  }


  toggleStudentActive(studentId) {
    return this.http.put<IToggleActiveStudent>(`${env.API_ROOT}/api/Student/StudentActivation/${studentId}`, {}).pipe(catchError(this.handleError.logError))
  }

  toggleStudenPremium(studentId) {

    return this.http.put(`${env.API_ROOT}/api/Student/PremiumStudentActivation/${studentId}`, {}).pipe(catchError(this.handleError.logError))

  }

  getStudentById(studentId) {
    return this.http.get<IStudent>(`${env.API_ROOT}/api/Student/GetStudentById/${studentId}`).pipe(catchError(this.handleError.logError))
  }

  getStudentSubjectsByGradeId(filter: { sectionId: string, gradeId: string }) {

    return this.http.post<ISubjectFilterResponse>(`${env.API_ROOT}/api/Subject/GetSubjects`, filter).pipe(catchError(this.handleError.logError))

  }



  addExtraRequest(requestData) {
    return this.http.post(`${env.API_ROOT}/api/ExtraRequest/AddExtraRequestToStudent`, requestData).pipe(catchError(this.handleError.logError))

  }


  edtiStudent(studentData) {
    return this.http.put(`${env.API_ROOT}/api/Student/AdminStudentEditProfile`, studentData).pipe(catchError(this.handleError.logError))
  }



  getStudentExtraRequestesForSubject(data: { subjectId: string, studentId: string }) {
    return this.http.post<IExtraRequestResponse>(`${environment.API_ROOT}/api/ExtraRequest/GetStudentExtraRequest`, data)
  }


}


