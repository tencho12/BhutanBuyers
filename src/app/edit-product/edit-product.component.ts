import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productForm: FormGroup;
  formData:any;
  selectedFile: File;

  category: any = [
    { id: 1, name: 'clothing' },
    { id: 2, name: 'laptops' },
    { id: 3, name: 'phones' },
    { id: 4, name: 'electronics' }
  ];

  size: any = ['small', 'medium', 'large'];


  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    //  console.log(this.data.productDetail)
    this.addProductForm();
    if (this.data.productDetail) {
      this.editProductForm();
    }
    // console.log(this.data)
  }
  addProductForm() {
    this.productForm = this.fb.group({
      product_id:[''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category_id: [this.category, [Validators.required]],
      size: [this.size, [Validators.required]],
      image: [this.selectedFile]
    });
  }

  editProductForm() {
    this.productForm.patchValue({
      product_id: this.data.productDetail[0].product_id,
      name: this.data.productDetail[0].name,
      description: this.data.productDetail[0].description,
      price: this.data.productDetail[0].price,
      category_id: this.data.productDetail[0].category,
      size: this.data.productDetail[0].size,
      image: [this.selectedFile]      
    })
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  save() {
    // console.log(this.productForm.value)
    this.dialogRef.close(this.productForm.value);
    // console.log(this.productForm)
    //save the document
  }

  cancel() {
    this.dialogRef.close();
    this.productForm.reset();
    //save the document
  }
  
}
