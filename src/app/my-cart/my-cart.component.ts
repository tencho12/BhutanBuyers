import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service'
import jwt_decode from 'jwt-decode'
import {Router} from '@angular/router'

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  cartItem = []
  useremail={}  
  constructor(private _eventService: EventService,
    private _route:Router
  ) { }

  ngOnInit() {
    const token = localStorage.token;
    const decoded = jwt_decode(token)
    this.useremail['user_email'] = decoded.email

    this._eventService.getProductsInCart(this.useremail)
      .subscribe(
        res => this.cartItem = res,
        err => console.log(err)
      )
  }
  removeFromCart(product_id) {
    this._eventService.removeFromCart(product_id)
      .subscribe(
        res => this._route.navigate(['/allproducts']),
        err => console.log(err)
      )
  }

}
