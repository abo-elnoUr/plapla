import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { catchError } from "rxjs/operators"
import { environment as env } from "@env/environment";
import { ISubject, ISubjectFilterResponse } from 'src/app/helpers/_interfaces/subject';
import { IStage } from './../../../../helpers/_interfaces/stage';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {


  constructor(private http: HttpClient, private handleError: HandleErrorService) { }


  getListOfSubjects() {
    return this.http.get<ISubjectFilterResponse>(`${env.API_ROOT}/api/Subject/GetAllSubjects`).pipe(catchError(this.handleError.logError))

  }

  // Get Subjects
  getSubjects(filter) {
    return this.http.post<ISubjectFilterResponse>(`${env.API_ROOT}/api/Subject/GetSubjects`, filter).pipe(catchError(this.handleError.logError))
  }

  // Get All Stages
  getAllStages() {
    return this.http.get<IStage[]>(`${env.API_ROOT}/api/Stage/GetStages`).pipe(catchError(this.handleError.logError))
  }

  // Get Grades

  getSubjectsList() {
    return this.http.get<ISubject[]>(`${env.API_ROOT}/api/Subject/GetAllSubjects`).pipe(catchError(this.handleError.logError))
  }



  // Get Grades By Stage ID
  getGradesByStageId(stageId: string) {
    return this.http.get(`${env.API_ROOT}/api/Grade/GetGradesByStageIdAdmin/${stageId}`).pipe(catchError(this.handleError.logError))
    // return this.http.get(`${env.API_ROOT}/api/Grade/GetGradesByStageIdAdmin/ad094dde-acfe-491a-a993-c1fab5f5afda`).pipe(catchError(this.handleError.logError))
  }


  getSubjectBySectionAndGrade(sectionId:string, gradeId:string) {
    return this.http.get<ISubject[]>(`${env.API_ROOT}/api/Subject/GetSubjectsByGradeAndSection?SectionId=${sectionId}&GradeId=${gradeId}`)
  }


  // Get Subject By Id
  getSubjectById(subjectId) {
    return this.http.get<ISubject>(`${env.API_ROOT}/api/Subject/GetSubjectById/${subjectId}`).pipe(catchError(this.handleError.logError))
  }


  // Get Subjects By Grade Id
  getSubjectsByGradeId(filter: {
    sectionId: string
    gradeId: string
  }) {
    console.log(filter)
    return this.http.post<ISubjectFilterResponse>(`${env.API_ROOT}/api/Subject/GetSubjects`, filter).pipe(catchError(this.handleError.logError))

  }

  filtrationSubjects(filter) {
    return this.http.post<ISubjectFilterResponse>(`${env.API_ROOT}/api/Subject/GetSubjects`, filter).pipe(catchError(this.handleError.logError))
  }


  // Create Subject
  createSubject(subjectData) {
    return this.http.post(`${env.API_ROOT}/api/Subject/AddSubject`, subjectData).pipe(catchError(this.handleError.logError))
  }



  // Edit Subject
  editSubject(subjectData) {
    return this.http.put(`${env.API_ROOT}/api/Subject/EditSubject`, subjectData).pipe(catchError(this.handleError.logError))
  }


  // Delete Subject
  deleteSubject(subjectId) {
    return this.http.delete(`${env.API_ROOT}/api/Subject/DeleteSubject/${subjectId}`).pipe(catchError(this.handleError.logError))
  }

  // *********************** add subject **************

  // get all section
  getSubjectSection(){
    return this.http.get(`${env.API_ROOT}/api/Section/GetSections`).pipe(catchError(this.handleError.logError))
  }

  // get all branches
  getSubjectBranch(){
    return this.http.get(`${env.API_ROOT}/api/Branch/Get`).pipe(catchError(this.handleError.logError))
  }

  // get all mazhab
  getSubjectMazhab(){
    return this.http.get(`${env.API_ROOT}/api/Mzhb/Get`).pipe(catchError(this.handleError.logError))
  }

  activation(subjectId: string) {
    return this.http.put(`${env.API_ROOT}/api/Subject/SubjectActivation/${subjectId}`, {})
  }

}
