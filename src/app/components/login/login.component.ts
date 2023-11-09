
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup; //"login form" adında FormGroup türünde bir değişken bildirimi

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { } //injection

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required], //username ve pw'nin gerekli olduğunu belirtiyoruz
    })
  }


  hideShowPass() {   //şifre gösterip göstermeme ayarı.
    this.isText = !this.isText;
    if (this.isText) {
      this.eyeIcon = "fa-eye";
      this.type = "text";
    }
    else {
      this.eyeIcon = "fa-eye-slash";
      this.type = "password";
    }
  }

  onLogin() {
    if (this.loginForm.valid) {

      console.log(this.loginForm.value)

      
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{alert(res.message);
        this.loginForm.reset();
        this.auth.storeToken(res.token);  //kullanıcı giriş yaptığında kullanıcı ile birlikte gelen token'i tutuyor.
        this.router.navigate(['dashboard']);
        },
        error:(err)=>{alert(err?.error.message)}
      })

    }
    else {
      //throw error with required field.
      this.validateAllFormFields(this.loginForm)
      //alert("The provided information is incorrect");
    }
  }

  private validateAllFormFields(formGroup:FormGroup){  //bu alan doldurulmuş mu değiştirilmiş mi kontrol.
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if (control instanceof FormControl){
        control.markAsDirty({onlySelf:true})
      }
      else if (control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }
}
