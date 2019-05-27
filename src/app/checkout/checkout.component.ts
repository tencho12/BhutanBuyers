import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service'
import jwt_decode from 'jwt-decode'
import { Router } from '@angular/router'
import { summaryFileName } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  useremail = {}
  checkOutItems = [];
  num: number
  count = 1;

  userDetail={}

  constructor(
    private _eventService: EventService,
    private _router: Router  
  ) { }

  ngOnInit() {

    const token = localStorage.token;
    const decoded = jwt_decode(token)
    this.useremail['user_email'] = decoded.email

    this._eventService.getProductsInCart(this.useremail)
      .subscribe(
        res => {
          this.checkOutItems = res,
            this.num=this.checkOutItems.length
        },
        err => console.log(err)
    )
  }

  getTotel() {
    let sum = 0;
    // return console.log(this.checkOutItems)
    this.checkOutItems.forEach((element) => {
      sum=sum+element.price
    });
    return sum;
  }

  placeOrder() {
    this._eventService.placeOrder(this.userDetail)
      .subscribe(
        res =>console.log(res),
        err => console.log(err)
      )
  }

}
