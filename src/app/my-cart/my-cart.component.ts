import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  cartItem = [];
  useremail = {};
  noitem: boolean = true;

  constructor(
    private eventService: EventService,
  ) { }

  ngOnInit() {
    this.decodeToken();
    this.getProductsInCart();
  }
  getProductsInCart() {
    this.eventService.getProductsInCart(this.useremail)
      .subscribe(
        res => {
          this.cartItem = res
          if (this.cartItem.length) {
            this.noItemInCart()
          }
        },
        err => console.log(err)
      );
  }

  decodeToken() {
    const token = localStorage.token;
    const decoded = jwt_decode(token);
    this.useremail['user_email'] = decoded.email;
  }

  removeFromCart(cart_id) {
    this.eventService.removeFromCart(cart_id)
      .subscribe(
        res => this.getProductsInCart(),
        err => console.log(err)
      );
  }

  noItemInCart() {
    this.noitem = false;
  }
}
