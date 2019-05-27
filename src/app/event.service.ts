import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  eventData={}

  private _eventsUrl = "http://localhost:3000/getProducts"
  private _specialEventsUrl = "http://localhost:3000/special";
  private _addtocartUrl = "http://localhost:3000/addToCart"
  private _showcartUrl = "http://localhost:3000/getCartItem"
  private _placeOrderUrl = "http://localhost:3000/placeOrder"
  private _removeOrderUrl = "http://localhost:3000/removeOrder"
  private _removeProductUrl = "http://localhost:3000/removeProduct"


  
  
  
  constructor(private http: HttpClient) { }
  
  getProducts() {
    return this.http.get<any>(this._eventsUrl)
  }

  getSpecialEvents() {
    return this.http.get<any>(this._specialEventsUrl)
  }

  addTocart(user_email, product_id) {
    this.eventData['user_email'] = user_email
    this.eventData['product_id'] = product_id
    return this.http.post<any>(this._addtocartUrl, this.eventData)
  }

  getProductsInCart(user_email) {
    return this.http.post<any>(this._showcartUrl, user_email)
  }
  placeOrder(userdetails) {
    return this.http.post<any>(this._placeOrderUrl, userdetails)
    
  }

  removeFromCart(product_id) {
    const product={'product_id':product_id}
    return this.http.post<any>(this._removeOrderUrl, product)
    
  }
  removeProduct(product_id) {
    const product = { 'product_id': product_id }
    return this.http.post<any>(this._removeProductUrl, product)
  }
}
