import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {

  }
  OnAstroLiteProducts_Click(value) {
    if(value=="Gold"){

    }
    else if(value=="Silver"){

    }
    this.router.navigate(["/products/astrogoldsilver"]);
  }
}
