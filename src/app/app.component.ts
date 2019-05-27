import { Component } from '@angular/core';
import { AuthService } from './auth.service'
import { AuthAdminService} from './auth-admin.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BhutanBuyers';

  constructor(
    private _authService: AuthService,
    private _authAdimService: AuthAdminService
  ) { }
}
