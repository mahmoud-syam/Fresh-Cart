import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient  , private _Router:Router) { }
  logOut():void{
    localStorage.removeItem('eToken')
    // Login
    this._Router.navigate(['/login']);
  }
  // Glabal Property to save data when decode
   userData:any;
  //  Function to Decode Token
   saveUserData(){

    if(localStorage.getItem('eToken') != null){ //Token Mogod

      let encodeToken:any = localStorage.getItem('eToken');
      let decodeToken = jwtDecode(encodeToken);
      this.userData = decodeToken;
      // console.log(decodeToken);
      
    }

   }

  //Function To Send UserData to Api register 
  setRegister(userData:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , userData )
  }
  //Function To Send UserData to Api login 
  setLogin(userData:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , userData )
  }


}
