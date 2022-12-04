import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICountryModel } from '../models/country.model';
import { environment as env } from "@env/environment";
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) { }

  getAllCountries()
  {
    return this.http.get<Array<ICountryModel>>(`${env.API_ROOT}/api/countries/GetAllCountries`);
  }
}
