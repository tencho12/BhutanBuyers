import { Component, OnInit } from '@angular/core';
//my imports
import { Router } from '@angular/router'
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData={}
  constructor(
    private _auth: AuthService,
    private _router: Router
    ) { }

  ngOnInit() {
  }
  loginUser() {
    // console.log(this.loginUserData)
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
          this._router.navigate(['/allproducts'])
        },
      err=>console.log(err)
    )
  }
}
