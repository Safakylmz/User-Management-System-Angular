import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";


export @Injectable({
  providedIn: 'root'
})

class AuthGuard implements CanActivate{
  constructor(private auth: AuthService, private router: Router){
    
  }
  canActivate():boolean{
    if(this.auth.isLoggedIn())
    {
      return true
    }
    else
    {
      alert("Please Login First");
      this.router.navigate(['login'])
      return false
    }
  }
    
}
