import { Component, OnInit } from '@angular/core';
//my imports
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';
import { FormGroup,FormBuilder, Validators } from '@angular/forms'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  registerUserData = {}
  
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      first_name: ['',
        [
        Validators.required
      ]],
      last_name: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
      ]],
      location: ['',[Validators.required]],
      phone_no:['',[Validators.required]]
    });
  }
  registerUser() {
    //  console.log(this.registerForm.value)
    this._auth.registerUser(this.registerForm.value)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
          this._router.navigate(['/allproducts'])
        },
        err=>console.log(err)
    )
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
}
