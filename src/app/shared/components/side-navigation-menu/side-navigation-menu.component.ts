import { Component, NgModule, Output, Input, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { DxTreeViewModule, DxTreeViewComponent } from 'devextreme-angular/ui/tree-view';
import * as events from 'devextreme/events';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { Router } from '@angular/router';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { LoginService } from 'src/Services/LoginService/LoginService';
import { PageNotFoundComponent } from '../pagenotfound/pagenotfound.component';

@Component({
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss']
})
export class SideNavigationMenuComponent implements AfterViewInit, OnDestroy {
  @ViewChild(DxTreeViewComponent)
  menu: DxTreeViewComponent;

  @Output()
  selectedItemChanged = new EventEmitter<string>();

  @Output()
  openMenu = new EventEmitter<any>();

  @Input()
  items: any[];
  isHomePage: boolean;

  @Input()
  set selectedItem(value: String) {
    if (this.menu.instance) {
      this.menu.instance.selectItem(value);
    }
  }

  private _compactMode = false;
  @Input()
  get compactMode() {
    return this._compactMode;
  }
  set compactMode(val) {
    this._compactMode = val;
    if (val && this.menu.instance) {
      this.menu.instance.collapseAll();
    }
  }

  constructor(public loadingSwitchService:LoadingSwitchService,private loginService:LoginService,private elementRef: ElementRef,private router:Router) { }

  updateSelection(event) {
    const nodeClass = 'dx-treeview-node';
    const selectedClass = 'dx-state-selected';
    const leafNodeClass = 'dx-treeview-node-is-leaf';
    const element: HTMLElement = event.element;

    const rootNodes = element.querySelectorAll(`.${nodeClass}:not(.${leafNodeClass})`);
    Array.from(rootNodes).forEach(node => {
      node.classList.remove(selectedClass);
    });

    let selectedNode = element.querySelector(`.${nodeClass}.${selectedClass}`);
    while (selectedNode && selectedNode.parentElement) {
      if (selectedNode.classList.contains(nodeClass)) {
          selectedNode.classList.add(selectedClass);
      }
      selectedNode = selectedNode.parentElement;
    }
  }

  onItemClick(event) {
    this.selectedItemChanged.emit(event);
    //this.loginService.isHomePage=false;
    if(event.itemData.text=='Services'){
         this.router.navigate(['/services']);
    }
    else if (event.itemData.path == '/settings' || event.itemData.path == '/wallet/depoToWallet' ||event.itemData.path == '/profile'||event.itemData.path == '/admin') {
      if (StorageService.GetItem('refreshToken') != undefined) {
        this.router.navigate([event.itemData.path]);
      }
      // else if (event.itemData.path == '/home'){
      //   this.loginService.isHomePage=true;
      // }
      else if (event.itemData.path == '/registration-form'){
        if (StorageService.GetItem('refreshToken') != undefined) {
          this.loadingSwitchService.popupVisible=true;
          this.loadingSwitchService.message='Please Logout, to Register with New UserID';
        }
      }
      else {
        this.loginService.path = event.itemData.path;
        this.router.navigate(['/login-form']);
      }
    }
    else {
      this.router.navigate([event.itemData.path]);
    }
  }

  onMenuInitialized(event) {
    event.component.option('deferRendering', false);
  }

  ngAfterViewInit() {
    events.on(this.elementRef.nativeElement, 'dxclick', (e) => {
      this.openMenu.next(e);
    });
  }

  ngOnDestroy() {
    events.off(this.elementRef.nativeElement, 'dxclick');
  }
}

@NgModule({
  imports: [ DxTreeViewModule ],
  declarations: [ SideNavigationMenuComponent, PageNotFoundComponent ],
  exports: [ SideNavigationMenuComponent ]
})
export class SideNavigationMenuModule { }
