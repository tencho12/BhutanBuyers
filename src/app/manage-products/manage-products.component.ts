import { Component, OnInit } from '@angular/core';
import { AuthAdminService } from '../auth-admin.service'
import { EventService } from '../event.service'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators, NgModel} from '@angular/forms'
import { MatDialog } from '@angular/material';
import { EditProductComponent } from '../edit-product/edit-product.component';


@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
  entryComponents: [EditProductComponent]

})
  

export class ManageProductsComponent implements OnInit {

  products = []
  productDetail: any;
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
    private _router: Router,
    public dialog: MatDialog

  ) { }

  ngOnInit() {
    this.initilizeForm();
    this.getProducts();
  }

  initilizeForm() {
    this.addProductForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category_id: [this.category, [Validators.required]],
      size: [this.size, [Validators.required]],
      image: [this.selectedFile]
    });
  }

  getProducts() {
    this._eventService.getProducts()
      .subscribe(
        res => this.products = res,
        err => console.log(err)
      );
  }

  addProduct() {
    this._authAdmin.addProduct(this.addProductForm.value)
      .subscribe(
        res => {
          console.log(res)
          this.getProducts();
        },
        err => console.log(err)
      );
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0]
    // this.productDetail['image']=event.target.files[0]
    console.log(this.selectedFile)
  }
  removeproduct(product_id) {
    this._eventService.removeProduct(product_id)
      .subscribe(
        res => this.getProducts(),
        err => console.log(err)
      )
  }


//material dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(EditProductComponent, {  
      data: {
       productDetail :this.oneProduct
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.category_id) {
        this._authAdmin.addProduct(result)
          .subscribe(
            res => {
              this.getProducts();
            },
            err => console.log(err)
          )
      }
    });
  }

  getProduct(productId) { 
      if (productId) {
      this._eventService.getProduct(productId)
        .subscribe(
          res => {
            this.oneProduct = res;
            // console.log(this.oneProduct);

            this.openDialog();
          },
          err => console.log(err)
        );
    }
  }
}


