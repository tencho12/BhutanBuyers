import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ManageProductsComponent } from './manage-products.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/shared/material.module';



const routes: Routes = [
    {
        path: '',
        component: ManageProductsComponent
    },
];
@NgModule({
    declarations: [ManageProductsComponent,EditProductComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        MaterialModule,
        
    ],
    entryComponents:[EditProductComponent]
})
export class ManageProductsModule { }

