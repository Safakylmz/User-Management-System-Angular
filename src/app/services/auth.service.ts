import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl:string ="https://localhost:7034/api/User/"
  constructor(private http : HttpClient) { }


  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj)  //backend register ile iletişim.

  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}login`,loginObj)  //backend login ile iletişim
  }

  storeToken(tokenValue: string){          //kullanıcı giriş yapınca backendden gelen tokeni kayıt ediyor.
    localStorage.setItem('token', tokenValue)
  }

  getToken(){        //when required get token.
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')  //iki ünlem koyduk ki string yerine boolean değer dönsün
  }

}
