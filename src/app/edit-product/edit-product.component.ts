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
  // srcResult: File;
  // percentDone: number;
  // uploadSuccess: boolean;
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
    // console.log(this.data.productDetail && this.data.productDetail[0].name)
    this.addProductForm();
    if (this.data.productDetail) {
      this.editProductForm();
    }
    console.log(this.data)
  }
  addProductForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category_id: [this.category, [Validators.required]],
      size: [this.size, [Validators.required]],
      // image: [this.srcResult]
    });
  }

  editProductForm() {
    this.productForm.patchValue({
      name: this.data.productDetail[0].name,
      description: this.data.productDetail[0].description,
      price: this.data.productDetail[0].price,
      category_id: this.data.productDetail[0].category,
      size: this.data.productDetail[0].size,
      // image: this.data.productDetail[0].image
    })
}

  save() {
    // console.log(this.productForm.value)
    this.dialogRef.close(this.productForm.value);
    console.log(this.productForm)
    //save the document
  }

  cancel() {
    this.dialogRef.close();
    this.productForm.reset();
    //save the document
  }
  
}
