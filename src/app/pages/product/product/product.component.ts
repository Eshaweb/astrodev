import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/Services/ProductService/ProductService';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(public productService:ProductService,public router: Router) { }

  ngOnInit() {

  }
  OnAstroLiteProducts_Click(value) {
    if (value == "Gold") {
      this.productService.ProductName = "Gold";
    }
    else if (value == "Silver") {
      this.productService.ProductName = "Silver";
    }
    this.router.navigate(["/products/astrogoldsilver"]);
  }
}
