import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SocialLinksService {

  constructor(
    private _http: HttpClient
  ) { }

  getSocialLinks() {
    return this._http.get(`${environment.API_ROOT}/api/SocialLink/GetSocialLinks`)
  }
  editSocialLinks(socialData: any) {
    return this._http.put(`${environment.API_ROOT}/api/SocialLink/EditSocialLinks`, socialData)
  }

}
