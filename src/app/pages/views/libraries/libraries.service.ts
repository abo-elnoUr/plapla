import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { ILibrary } from 'src/app/helpers/_interfaces/library';
@Injectable({
  providedIn: 'root'
})
export class LibrariesService {

  constructor(
    private _http: HttpClient
  ) { }

  getLibrariesForAdmin(gradeId: string) {
    return this._http.get<ILibrary[]>(`${environment.API_ROOT}/api/Library/GetLibrariesForAdmin/${gradeId}`)
  }

  addLibrary(libariryData: any) {
    return this._http.post(`${environment.API_ROOT}/api/Library/AddLibrary`, libariryData)
  }

  deleteLibrary(libraryId: any) {
    return this._http.delete(`${environment.API_ROOT}/api/Library/DeleteLibrary/${libraryId}`)
  }
}
