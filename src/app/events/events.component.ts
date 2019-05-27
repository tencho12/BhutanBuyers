import { Component, OnInit } from '@angular/core';
import { EventService} from '../event.service'
import jwt_decode from 'jwt-decode'
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'




@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  products=[]
  useremail:string
  constructor(
    private _eventService: EventService,
    private _router: Router
  ) { }
  
  ngOnInit() {
    this._eventService.getProducts()
      .subscribe(
        res => this.products = res,
        err=>console.log(err)
    )

    const token = localStorage.token;
    const decoded = jwt_decode(token)
    this.useremail = decoded.email
  }
  
  addToCart(id) {
    this._eventService.addTocart(this.useremail,id ).subscribe(
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

}
