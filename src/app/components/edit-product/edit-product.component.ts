import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../models/product";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit{

  editProductForm!: FormGroup;
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    const productId = this.activatedRoute.snapshot.params["id"];
    this.productsService.getById(productId).subscribe(
      product => {
        this.editProductForm = new FormGroup(
          {
            id: new FormControl(product.id),
            name: new FormControl(product.name, [Validators.required, Validators.max(10)]),
            price: new FormControl(product.price, [Validators.required]),
            is_checked: new FormControl(product.is_checked),
            title:new FormControl(product.title, [Validators.required, Validators.max(10)]),
            description:new FormControl(product.description, [Validators.required, Validators.max(10)]),
            priority:new FormControl(product.priority, [Validators.required, Validators.max(10)]),
            status:new FormControl(product.status, [Validators.required, Validators.max(10)]),
            duedate:new FormControl(product.duedate, [Validators.required, Validators.max(10)])
          }
        );
      }
    );

  }

  updateProduct() {
    let product = this.editProductForm.value;
    this.productsService.update(product).subscribe(
      () => this.router.navigateByUrl("/products")
    );
  }}
