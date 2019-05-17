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
      if (value == "Gold") {
        this.productService.ProductName = "Gold";
        StorageService.SetItem('ProductName', this.productService.ProductName);
        this.router.navigate(["/products/astrogoldsilver"]);
      }
      else if (value == "Silver") {
        this.productService.ProductName = "Silver";
        StorageService.SetItem('ProductName', this.productService.ProductName);
        this.router.navigate(["/products/astrogoldsilver"]);
      }
      else if (value == "Professional") {
        this.productService.ProductName = "Professional";
        StorageService.SetItem('ProductName', this.productService.ProductName);
        this.router.navigate(["/products/astroprofessional"]);
      }
      else if (value == "ProfessionalYearlySubscription") {
        this.productService.ProductName = "Professional Full Package";
        StorageService.SetItem('ProductName', "Professional Full Package");
        this.router.navigate(["/products/astroprofessional"]);
      }
    
  }
}
