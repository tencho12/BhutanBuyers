import { Component, OnInit } from '@angular/core';
import { AuthAdminService } from '../auth-admin.service'
import { EventService } from '../event.service'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators} from '@angular/forms'




@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  products = []
  productDetail = {}
  selectedFile: File;
  oneProduct:any;
  // percentDone: number;
  // uploadSuccess: boolean;

  category: any = [
    { id: 1, name: 'clothing' },
    { id: 2, name: 'laptops' },
    { id: 3, name: 'phones' },
    { id: 4, name: 'electronics' }
  ];
  
  size: any = ['small', 'medium', 'large'];
  
  addProductForm: FormGroup;
  constructor(
    private _authAdmin: AuthAdminService,
    private _eventService: EventService,
    private _route: Router,
    private fb: FormBuilder,
    private _router:Router

  ) { }

  ngOnInit() {
    this.addProductForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category_id: [this.category,[Validators.required]],
      size: [this.size, [Validators.required]],
      image:[this.selectedFile]
    });
    this.getProducts();
  }

  getProducts() { 
    this._eventService.getProducts()
      .subscribe(
        res => this.products = res,
        err => console.log(err)
      );
  }

  addProduct() {
    console.log(this.addProductForm.value)
    this._authAdmin.addProduct(this.addProductForm.value)
      .subscribe(
        res => {
          this._router.navigate(['/allproducts'])
        },
        err => console.log(err)
      )
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0]
    // this.productDetail['image']=event.target.files[0]
    //console.log(this.selectedFile)
  }
  removeproduct(product_id) {
    this._eventService.removeProduct(product_id)
      .subscribe(
        res => this._route.navigate(['/allproducts']),
        err => console.log(err)
      )
  }

  editProduct(product_id) {
    this._eventService.getProduct(product_id)
      .subscribe(
        res => {
          this.oneProduct = res;
          console.log(this.oneProduct)
          this.addProductForm.patchValue({
            name: this.oneProduct[0].name,
            description: this.oneProduct[0].description,
            price: this.oneProduct[0].price,
            category_id: this.oneProduct[0].category,
            size: this.oneProduct[0].size,
            image:this.oneProduct[0].image
          })
        },
        err => console.log(err)
      )
    console.log(product_id);
  }
}
