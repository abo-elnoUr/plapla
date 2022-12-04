import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from "rxjs/operators"
import { environment as env } from "@env/environment";
import { RolesHandleErrorService } from './roles-handle-error.service';
import { IAdmin, IAdminData, IRole } from 'src/app/helpers/_interfaces/Roles';
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(private http: HttpClient, private handleError: RolesHandleErrorService) { }


  getAllAdmins() {
    return this.http.get<Array<IAdmin>>(`${env.API_ROOT}/api/Admin/GetAdmins`).pipe(catchError(this.handleError.logError))
  }

  getAdminById(adminId) {
    return this.http.get<Array<IRole>>(`${env.API_ROOT}/api/Role/GetAdminRoles/${adminId}`).pipe(catchError(this.handleError.logError))
  }

  editAdminRoles(adminData: IAdminData) {
    return this.http.put(`${env.API_ROOT}/api/Role/EditAdminRoles`, adminData).pipe(catchError(this.handleError.logError))
  }


  createAdmin(data) {
    return this.http.post(`${env.API_ROOT}/api/Admin/Registration`, data).pipe(catchError(this.handleError.logError))
  }


  deleteAdmin(id) {
    return this.http.delete(`${env.API_ROOT}/api/Admin/RemoveAdmin/${id}`).pipe(catchError(this.handleError.logError))
  }


  resetAdminPassword(adminId, adminNewPassword) {
    return this.http.post(`${env.API_ROOT}/api/Admin/ResetPassword`, {
      "userIdentityId": adminId,
      "newPassword": adminNewPassword
    }).pipe(catchError(this.handleError.logError))
  }


  getAllSections() {
    return this.http.get(`${env.API_ROOT}​/api/Section/GetAllSectionsAdmin`).pipe(catchError(this.handleError.logError))
    //
  }


  getAdminData(adminId) {
    return this.http.get(`${env.API_ROOT}/api/Admin/GetAdminById/${adminId}`).pipe(catchError(this.handleError.logError))
  }

  isSupperAdmin() {
    let user = JSON.parse(localStorage.getItem("AuthToken"));
    let roles: string[] =  user.roles;
    if (roles.includes("SuperAdmin")) {
      return true
    }
    return false
  }

  editAdminProfile(adminData) {
     console.log("adminData", adminData)
    return this.http.put(`${env.API_ROOT}/api/Admin/EditAadminPrpfile`, adminData)
  }

}
