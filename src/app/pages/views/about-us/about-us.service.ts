import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

  constructor(private _http: HttpClient) { }

  GetAboutUs() {
    return this._http.get(`${environment.API_ROOT}/api/About/GetAboutUs`)
  }
  EditAboutUs(socialData: any) {
    return this._http.put(`${environment.API_ROOT}/api/About/EditAboutUs`, socialData)
  }

}
