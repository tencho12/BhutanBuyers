import { Injectable } from '@angular/core';
//my imports
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  username = '';
  private ordersUrl = "http://localhost:3000/getorders"
  private addProductUrl = "http://localhost:3000/addProduct";
  // private _addtocartUrl = "http://localhost:3000/addToCart"
  // private _showcartUrl = "http://localhost:3000/getCartItem"

  private _loginUrl = "http://localhost:3000/loginAdmin";


  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  loginAdmin(user) {
    return this.http.post<any>(this._loginUrl, user);
  }
  loggedInAdmin() {
    return !!localStorage.getItem('admintoken');
    //if the token exist in the browser,it will return true else false
  }

  logoutAdmin() {
    localStorage.removeItem('admintoken');
    this._router.navigate(['/allproducts']);
  }

  getToken() {
    return localStorage.getItem('admintoken');
  }

  getOrders() {
    debugger;
    return this.http.get<any>(this.ordersUrl);
  }
  addProduct(data) {
    return this.http.post<any>(this.addProductUrl, data);
  }

  set adminUsername(value) { 
    this.username = value;
  }

  get adminUsername() { 
    return this.username;
  }
}
