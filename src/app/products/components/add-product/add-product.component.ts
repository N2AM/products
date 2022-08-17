import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ProductModel} from "../../models/product-model.model";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm = this.fb.group({
    code:['', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.maxLength(20),
    ],],
    name:['', [
      Validators.required,
      Validators.maxLength(20),
    ],],
    basePrice:['', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.maxLength(6),
    ],]
  })

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ProductModel) { }

  ngOnInit(): void {
  }

  submit():void {
    this.dialogRef.close(this.productForm.value)
  }

}
