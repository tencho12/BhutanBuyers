import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service'
import jwt_decode from 'jwt-decode'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
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
  sum: number = 0;
  
  addressForm:FormGroup

  userDetail={}

  constructor(
    private _eventService: EventService,
    private _router: Router,
    private fb:FormBuilder
  ) { }

  ngOnInit() {

    this.addressForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      dzongkhag:['',Validators.required]
    });

    this.getProductInCart();
    // debugger;
    
  }
  getProductInCart() {
    const token = localStorage.token;
    const decoded = jwt_decode(token)
    this.useremail['user_email'] = decoded.email;

    this._eventService.getProductsInCart(this.useremail)
      .subscribe(
        res => {
          this.checkOutItems = res;
            this.num = this.checkOutItems.length;
            this.getTotel();
        },
        err => console.log(err)
    )
    
    
  }

  getTotel() {
    let summ = 0;
    this.checkOutItems.forEach((element) => {
      summ = summ + element.price;     
    });
    this.sum = summ;
    console.log(this.sum)
  }

  placeOrder() {
    this._eventService.placeOrder(this.checkOutItems)
      .subscribe(
        res =>console.log(res),
        err => console.log(err)
      )
  }

}
