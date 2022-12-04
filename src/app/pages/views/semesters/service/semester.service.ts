import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ISemester } from 'src/app/helpers/_interfaces/semesters';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  constructor(
    private _http: HttpClient
  ) { }


  getSemesters(subjectId:string='') {
    return this._http.get<ISemester[]>(`${environment.API_ROOT}/api/Semester/GetSemesters?subjectId=${subjectId}`)
  }



  getSemesterById(semesterId: string) {
    return this._http.get<ISemester>(`${environment.API_ROOT}/api/Semester/GetSemesterById/${semesterId}`)
  }

  createSemester(semesterData) {
    return this._http.post(`${environment.API_ROOT}/api/Semester/AddSemester`, semesterData)
  }

  updateSemester(semesterData) {
    console.log("semester Data", semesterData)
    return this._http.put(`${environment.API_ROOT}/api/Semester/EditSemester`, semesterData)
  }

  deleteSemester(semesterId) {
    return this._http.delete(`${environment.API_ROOT}/api/Semester/DeleteSemester/${semesterId}`)
  }

  semesterActivation(semesterId: string) {
    return this._http.get<ISemester>(`${environment.API_ROOT}/api/Semester/SemesterActivation/${semesterId}`)
  }



}
