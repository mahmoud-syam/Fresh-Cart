import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}

  // Global property to save msg and use it in method Error 
  msgError:string = '';
  // property to spinner
  isLoading:boolean = false;

  // To Create Form Syntax
  loginForm: FormGroup = new FormGroup({
    
    email: new FormControl(null , [Validators.required, Validators.email]),
    password: new FormControl(null ,[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    
    


  });
  // Function To Tklm API in Service
  handleForm(): void {

     
    if(this.loginForm.valid) {
      this.isLoading = true;


      
      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next:(response)=>{
          if(response.message == 'success' ){ //login
            this.isLoading = false;

            localStorage.setItem('eToken' , response.token);
            this._AuthService.saveUserData();


            this._Router.navigate(['/home'])
            // console.log(response.message);
            
          }
        },
        error:(err:HttpErrorResponse)=>{
          this.isLoading = false;

          this.msgError = err.error.message
          console.log(err.error.message);
    
          
        }
      })
    }
    else(
      this.loginForm.markAllAsTouched()
    )

  }
}
