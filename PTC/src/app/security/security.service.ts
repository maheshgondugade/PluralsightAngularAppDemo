import { Injectable } from '@angular/core';
import {  Observable, of } from 'rxjs'
import { AppUserAuth } from './app-user-auth';
import { AppUser } from './app-user';
import { LOGIN_MOCKS } from './login-mocks';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const API_URL = "http://localhost:5000/api/SecurityManager/"

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class SecurityService {
securityObject: AppUserAuth =  new AppUserAuth();

  constructor(private http: HttpClient) { }

  resetSecurityObject(): void {

    this.securityObject.userName="";
    this.securityObject.bearerToken ="";
    this.securityObject.isAuthenticated=false;
    this.securityObject.canAccessProducts=false; 
    this.securityObject.canAddProduct=false;
    this.securityObject.canSaveProducts=false;
    this.securityObject.canAccessCategories=false;
    this.securityObject.canAddCategory=false;

    localStorage.removeItem('bearerToken');
  }

  login(entity :  AppUser) : Observable<AppUserAuth> {
    this.resetSecurityObject();

    ////mock code
    // Object.assign(this.securityObject,
    // LOGIN_MOCKS.find(user=>user.userName.toLowerCase()===
    //               entry.userName.toLowerCase()));
    // if(this.securityObject.userName !== ""){
    // localStorage.setItem('bearerToken',this.securityObject.bearerToken);
    // }



    //return of(this.securityObject);
    //return of<AppUserAuth>(this.securityObject);

    return this.http.post<AppUserAuth>(API_URL+"login",
          entity,httpOptions).pipe(
            tap(resp => {
              Object.assign(this.securityObject,resp);
              localStorage.setItem("bearerToken",
                this.securityObject.bearerToken);
            }));
  }

  logout()  : void  {
    this.resetSecurityObject();
  }

}
