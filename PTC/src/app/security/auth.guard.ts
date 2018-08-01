import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from './security.service';
import { THROW_IF_NOT_FOUND } from '../../../node_modules/@angular/core/src/di/injector';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private securityService: SecurityService
            ,private router: Router){
  
}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      let claimType : string = next.data["claimType"];
      
      if(this.securityService.securityObject.isAuthenticated
        && this.securityService.securityObject[claimType]){
          return true;
        }
        else{
          this.router.navigate(['login'],{queryParams:{ returnUrl: state.url}});
          return false;
        }
          


  }
}
