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
  
  constructor(
    private _eventService: EventService,
    private _router: Router
  ) { }
  
  ngOnInit() {
    this._eventService.getProducts()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        res => {
          this.products = res
        },
        err=>console.log(err)
    )
    const token = localStorage.token;
    const decoded = jwt_decode(token)
    this.useremail = decoded.email;
    
  }
  
  addToCart(id) {
    console.log(this.useremail);
    this._eventService.addTocart(this.useremail, id)
      // .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
      res => console.log(res),
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['/login'])
          }
        }
      }
    )
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribeAll.next();
  }

}
