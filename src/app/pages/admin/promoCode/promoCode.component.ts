import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'promoCode.component.html',
  styleUrls: [ './promoCode.component.scss' ]
})

export class PromoCodeComponent {
  defaultVisible: boolean;
  constructor(public router: Router) {
    this.defaultVisible = false;
  }
  toggleDefault() {
    this.defaultVisible = !this.defaultVisible;
}
 
OnUnUsedPromoCodes_Click() {
    this.router.navigate(["/admin/unusedPromoCodes"]);
  }
  OnUsedPromoCodes_Click() {
    this.router.navigate(["/admin/usedPromoCodes"]);
  }
}
