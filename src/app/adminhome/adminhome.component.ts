import { Component, OnInit } from '@angular/core';
import { AuthAdminService } from '../auth-admin.service'
import jwt_decode from 'jwt-decode'


@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  Orders = []
  adminemail:string

  constructor(private _authAdmin: AuthAdminService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this._authAdmin.getOrders()
      .subscribe(
        res => {
          console.log(res)
          this.Orders = res
        },
        err => console.log(err)
      )

    const token = localStorage.token;
    const decoded = jwt_decode(token)
    this.adminemail = decoded.email
    // console.log(this.userdata)
  }

}
