import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { IAdvertisment } from 'src/app/helpers/_interfaces/advertiesment';
@Injectable({
  providedIn: 'root'
})
export class AdvertismentService {

  constructor(private _http: HttpClient) { }

  getAds() {
    return this._http.get<IAdvertisment[]>(`${environment.API_ROOT}/api/Advertisement/GetAdvertisements`);
  };

  addAds(advertismentData: any) {
    return this._http.post(`${environment.API_ROOT}/api/Advertisement/UploadAdvertisements`, advertismentData);
  };

  deleteAd(advertismentId: string) {
    return this._http.delete(`${environment.API_ROOT}/api/Advertisement/DeleteAdvertisement/${advertismentId}`)
  }

}
