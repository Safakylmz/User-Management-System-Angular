import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;
  
  constructor(private fb : FormBuilder, private auth: AuthService, private router: Router){}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
      
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

  onSignup(){
    if(this.signUpForm.valid){
      //perform logic 
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res =>{
          alert(res.message);
          this.signUpForm.reset();
          this.router.navigate(['login']);
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
    }
    else{
      this.validateAllFormFields(this.signUpForm)
      //logic for error
    }
  }

  private validateAllFormFields(formGroup:FormGroup){
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
