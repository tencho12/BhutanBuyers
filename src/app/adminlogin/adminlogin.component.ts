import { Component, OnInit } from '@angular/core';
//my imports
import { Router } from '@angular/router';
import { AuthAdminService } from "../auth-admin.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  loginAdminData = {}
  myForm: FormGroup;

  constructor(
    private auth: AuthAdminService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
        // Validators.pattern('') put patter of the password if any
      ]],
    })
  }

  get email() {
    return this.myForm.get('email')
  }

  get password() {
    return this.myForm.get('password')
  }

  loginAdmin() {
    this.loginAdminData['email'] = this.myForm.controls.email.value;
    this.loginAdminData['password'] = this.myForm.controls.password.value;
    //  console.log(this.loginAdminData)
    this.auth.loginAdmin(this.loginAdminData)
      .subscribe(
        res => {
          localStorage.setItem('admintoken', res.token);
          // this.auth.adminUsername = 'admin username';
          this.router.navigate(['/adminhome']);
        },
        err => console.log(err)
      )
  }

}
