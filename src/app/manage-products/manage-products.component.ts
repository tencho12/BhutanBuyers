import { Component, OnInit } from '@angular/core';
import { AuthAdminService } from '../auth-admin.service';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { EditProductComponent } from '../edit-product/edit-product.component';


@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
  entryComponents: [EditProductComponent]

})
  
export class ManageProductsComponent implements OnInit {

  products = [];
  productDetail: any;
  selectedFile: File;
  oneProduct:any;

  category: any = [
    { id: 1, name: 'clothing' },
    { id: 2, name: 'laptops' },
    { id: 3, name: 'phones' },
    { id: 4, name: 'electronics' }
  ];
  
  size: any = ['small', 'medium', 'large'];
  
  addProductForm: FormGroup;

  constructor(
    private authAdmin: AuthAdminService,
    private eventService: EventService,
    private fb: FormBuilder,
    private router: Router,
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
    this.eventService.getProducts()
      .subscribe(
        res => this.products = res,
        err => console.log(err)
      );
  }

  addProduct() {
    this.authAdmin.addProduct(this.addProductForm.value)
      .subscribe(
        res => {
          console.log(res)
          this.getProducts();
        },
        err => console.log(err)
      );
  }
 
  removeproduct(product_id) {
    this.eventService.removeProduct(product_id)
      .subscribe(
        res => this.getProducts(),
        err => console.log(err)
      );
  }

//material dialog
  openDialog(edit: boolean): void {
    const dialogRef = this.dialog.open(EditProductComponent, {  
      data: {
        productDetail: this.oneProduct,
        edit: edit
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.category_id) {
        if (!edit) {
          this.authAdmin.addProduct(result)
            .subscribe(
              res => {
                this.getProducts();
              },
              err => console.log(err)
            );
        }
        else {
          this.eventService.updateproduct(result)
            .subscribe(
              res => this.getProducts(),
              err => console.log(err)
          )
        }
      }
      this.oneProduct = {};
    });
  }

  getProduct(productId) { 
      if (productId) {
      this.eventService.getProduct(productId)
        .subscribe(
          res => {
            this.oneProduct = res;
            this.openDialog(true);
          },
          err => console.log(err)
        );
    }
  }
}


