import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service'
import jwt_decode from 'jwt-decode'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

// export interface Product { 
//   item: Array<Item>
//   address: []
// }

// export interface Item { 
//   cart_id: number,
//   user_id: number
// }

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  useremail = {}
  checkOutItems = [];
  num: number;
  sum: number = 0;
  product = {};
  success: boolean = false;
  
  addressForm:FormGroup

  userDetail={}

  constructor(
    private _eventService: EventService,
    private _router: Router,
    private fb:FormBuilder
  ) { }

  ngOnInit() {

    this.addressForm = this.fb.group({
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
    this.product['item'] = this.checkOutItems;
    this.product['address']=this.addressForm.value
    // console.log(this.product)  

    this._eventService.placeOrder(this.product)
      .subscribe(
        res => {
          // console.log(res),
            this.orderSuccess();
        },
        err => console.log(err)
      )
  }

  orderSuccess() {
    this.success = true;
    setTimeout(() => { this.success = false }, 2000);
  }

}
