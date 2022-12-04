import { Injectable, ViewChild } from '@angular/core';
import { environment as env } from "@env/environment";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IRole } from '../helpers/_interfaces/Roles';

interface IUser {
  id: String;
  token: String;
  userName: String;
  expirationDate: String;
  roles: string[];
  message:string;
  unauthorized:boolean;
  userType:string,
  teacherPermession:Array<string>
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(private http: HttpClient, private route: Router) {
    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('AuthToken')));//GET TOKEN FROM LOCAL STORAGE

    // So, Are You Sure From "JSON.parse()" ? yes i'm sure
    // Give Me A sec // I Have DOne

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  public static screens: String[] = [];



  // المواد
  // الطلاب
  login(userData) {
    console.log(userData, 'hello from service')
    return this.http.post<IUser>(`${env.API_ROOT}/api/Admin/Login`, userData).pipe(map(user => {
      // console.log(user.roles)
      if (user.token != null) {

        localStorage.setItem('AuthToken', JSON.stringify(user));

        localStorage.setItem("UserRoles", JSON.stringify(user.roles))

        this.currentUserSubject.next(user);
      }
      return user;
    }))
  }

  logout() {
    localStorage.removeItem('AuthToken') // Just In Logout But Look
    this.route.navigate(['/Admin/login'])
    this.currentUserSubject.next(null);
  }

}


// import { Injectable } from '@angular/core';
// import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class RoleGuardService  implements CanActivate  {
//   public static Screens:string[]=[];
//   constructor(private router: Router) { }
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     if (RoleGuardService.Screens.includes(route.data.ScreenName)||localStorage.getItem('RoleScreen').includes(route.data.ScreenName)) {
//       //console.log(localStorage.getItem('RoleScreen'));
//       return true;
//     } else {
//       //console.log(route.data.ScreenName,RoleGuardService.Screens)
//       this.router.navigate([`NotAuthorized`]);
//       // this.router.navigate(['/Admin/cps/home']);
//       return false;
//     }
//   }
// }
