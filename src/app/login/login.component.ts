import { Component, OnInit } from '@angular/core';
//my imports
import { Router } from '@angular/router';
import { AuthService } from "../auth.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {};
  loginForm: FormGroup;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private fb: FormBuilder
    ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
        // Validators.pattern('') put patter of the password if any
      ]],
    });
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  loginUser() {
    this.loginUserData['email'] = this.loginForm.controls.email.value;
    this.loginUserData['password'] = this.loginForm.controls.password.value;
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
          this._router.navigate(['/allproducts'])
        },
        err => console.log(err)
      );
  }
}
