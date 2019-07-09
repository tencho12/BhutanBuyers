import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  eventData={}

  private productUrl = "http://localhost:3000/getProducts"
  private _specialEventsUrl = "http://localhost:3000/special";
  private _addtocartUrl = "http://localhost:3000/addToCart"
  private _showcartUrl = "http://localhost:3000/getCartItem"
  private _placeOrderUrl = "http://localhost:3000/placeOrder"
  private _removeOrderUrl = "http://localhost:3000/removeOrder"
  private _removeProductUrl = "http://localhost:3000/removeProduct";
  private _getProductUrl = "http://localhost:3000/getProduct"
  private updateproductUrl = "http://localhost:3000/updateproduct"
  
  
  constructor(private http: HttpClient) { }
  
  getProducts() {
    return this.http.get<any>(this.productUrl);
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
  placeOrder(checkOutItems) {
    // console.log(checkOutItems)
    return this.http.post<any>(this._placeOrderUrl, checkOutItems)
    
  }

  removeFromCart(cart_id) {
    const product = { 'cart_id': cart_id}
    return this.http.post<any>(this._removeOrderUrl, product)
    
  }
  removeProduct(product_id) {
    const product = { 'product_id': product_id }
    return this.http.post<any>(this._removeProductUrl, product)
  }

  getProduct(product_id) {
    const proid = { 'product_id': product_id };
    return this.http.post<any>(this._getProductUrl, proid);
  }

  updateproduct(data) {
    return this.http.post<any>(this.updateproductUrl, data);
  }
}
