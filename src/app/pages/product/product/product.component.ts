import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/Services/ProductService/ProductService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoginService } from 'src/Services/LoginService/LoginService';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(public loginService:LoginService,public productService:ProductService,public router: Router) { }

  ngOnInit() {

  }
  OnAstroLiteProducts_Click(value) {
    if (StorageService.GetItem('refreshToken') != undefined) {
      if (value == "Gold") {
        this.productService.ProductName = "Gold";
        this.router.navigate(["/products/astrogoldsilver"]);
      }
      else if (value == "Silver") {
        this.productService.ProductName = "Silver";
        this.router.navigate(["/products/astrogoldsilver"]);
      }
      else if (value == "Professional") {
        this.productService.ProductName = "Professional";
        this.router.navigate(["/products/astroprofessional"]);
      }
    }
    else {
      if (value == "Gold") {
        this.productService.ProductName = "Gold";
        this.loginService.path = "/products/astrogoldsilver";
      this.router.navigate(["/login-form"]);
      }
      else if (value == "Silver") {
        this.productService.ProductName = "Silver";
        this.loginService.path = "/products/astrogoldsilver";
      this.router.navigate(["/login-form"]);
      }
      else if (value == "Professional") {
        this.productService.ProductName = "Professional";
        this.loginService.path = "/products/astroprofessional";
        this.router.navigate(["/login-form"]);
      }
    }
  }
}
