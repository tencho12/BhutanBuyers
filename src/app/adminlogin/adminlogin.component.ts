import { Component, OnInit } from '@angular/core';
//my imports
import { Router } from '@angular/router'
import { AuthAdminService } from "../auth-admin.service";

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  loginAdminData = {}

  constructor(
    private _auth: AuthAdminService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  loginAdmin() {
    // console.log(this.loginUserData)
    this._auth.loginAdmin(this.loginAdminData)
      .subscribe(
        res => {
          localStorage.setItem('admintoken', res.token)
          this._router.navigate(['/adminhome'])
        },
        err => console.log(err)
      )
  }

}
