import { Component, OnInit } from '@angular/core';
import { EventService} from '../event.service'
import jwt_decode from 'jwt-decode'
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  
  private unsubscribeAll: Subject<any> = new Subject;
  products=[]
  useremail: string
  success: boolean = false;
  
  constructor(
    private _eventService: EventService,
    private _router: Router
  ) { }
  
  ngOnInit() {
    this.getProducts();
    this.getuserDetail();
  }

  getProducts() {
    this._eventService.getProducts()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        res => {
          console.log(res);
          this.products = res
        },
        err => console.log(err)
      )
  }
  getuserDetail() {
    const token = localStorage.token;
    const decoded = jwt_decode(token)
    this.useremail = decoded.email;
  }
  
  addToCart(product) {
    this._eventService.addTocart(this.useremail, product.product_id)
      // .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        res => {
          this.setSuccess(product);
        },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['/login'])
          }
        }
      }
    )
  }
  setSuccess(product) {
    product.inCart = true;
    setTimeout(()=> { product.inCart=false }, 2000);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribeAll.next();
  }

}
