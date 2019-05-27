import { Component, OnInit } from '@angular/core';
import { AuthAdminService } from '../auth-admin.service'
import { EventService } from '../event.service'
import { Router } from '@angular/router'




@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  products = []
  productDetail = {}
  selectedFile:File
  
  constructor(
    private _authAdmin: AuthAdminService,
    private _eventService: EventService,
    private _route: Router  

  ) { }

  ngOnInit() {
    this._eventService.getProducts()
      .subscribe(
        res => this.products = res,
        err => console.log(err)
      )
  }
  addProduct() {
    // console.log(this.registerUserData)
    this._authAdmin.addProduct(this.productDetail)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0]
    // this.productDetail['image']=event.target.files[0]
    console.log(this.selectedFile)
  }
  removeproduct(product_id) {
    this._eventService.removeProduct(product_id)
      .subscribe(
        res => this._route.navigate(['/allproducts']),
        err => console.log(err)
      )
  }
}
