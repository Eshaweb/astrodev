import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  template: `
    <footer><ng-content></ng-content></footer>
  `,
  styleUrls: ['./footer.component.scss']
  // selector: 'app-footer',
  // templateUrl: 'footer.component.html',
  // styleUrls: ['./footer.component.scss']
})

export class FooterComponent {

}

@NgModule({
  declarations: [ FooterComponent ],
  imports:[RouterModule],
  exports: [ FooterComponent ]
})
export class FooterModule { }
