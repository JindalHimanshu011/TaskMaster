import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private productsService: ProductsService,
    private router: Router) {
  }

  ngOnInit(): void {

    this.productForm = new FormGroup(
      {
        
        title: new FormControl('', [Validators.required, Validators.max(10)]),
        description : new FormControl('', [Validators.required, Validators.max(100)]),        
        duedate: new FormControl(Date, [Validators.required]),
        priority: new FormControl('', [Validators.required, Validators.max(10)]),
        status: new FormControl('', [Validators.required, Validators.max(10)]),
        name: new FormControl('', [Validators.required, Validators.max(10)]),
        price: new FormControl(0.0, [Validators.required]),
        is_checked: new FormControl(false)
      }
    );
  }

  saveProduct() {
    let product = this.productForm.value;
    this.productsService.save(product).subscribe(
      value => this.router.navigateByUrl("/products")
    );
  }
}
