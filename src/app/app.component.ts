import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service'
import { AuthAdminService } from './auth-admin.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BhutanBuyers';
  // adminName = '';
  adminemail: string;
  constructor(
    private _authService: AuthService,
    private _authAdimService: AuthAdminService
  ) { }
  ngOnInit() {
    // debugger;
    // this.adminName = this._authAdimService.adminUsername;
  }
}
