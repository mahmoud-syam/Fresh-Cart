import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) { }

  // Global property to save msg and use it in method Error 
  msgError: string = '';
  // property to spinner
  isLoading: boolean = false;

  // To Create Form Syntax
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    rePassword: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^[01][0125][0-9]{9}$/)]),


  }, { validators: [this.confirmPassword] } as FormControlOptions);

  confirmPassword(group: FormGroup): void {
    let password = group.get('password');
    let rePassword = group.get('rePassword');

    if (rePassword?.value == '') {
      rePassword?.setErrors({ required: true })
    } else if (password?.value != rePassword?.value) {
      rePassword?.setErrors({ mismatch: true })
    }
  }

  // Function To talk API in Service
  handleForm(): void {


    if (this.registerForm.valid) {
      this.isLoading = true;



      this._AuthService.setRegister(this.registerForm.value).subscribe({
        // لو اليوزر سجل اكونت صح
        next: (response) => {
          if (response.message == 'success') { //login
            this.isLoading = false;
            // هينقل ل صفحة ال login 
            this._Router.navigate(['/login'])
            console.log(response.message);

          }
        },
        // لو ضرب ايرور 
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;

          this.msgError = err.error.message; 
          console.log(err.error.message);


        }


      })
    }

  }

}
