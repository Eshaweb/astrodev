import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/Services/AdminService/AdminService';
import { DxDataGridComponent } from 'devextreme-angular';



@Component({
  templateUrl: 'welcomeOffer.component.html',
  styleUrls: ['./welcomeOffer.component.scss']
})

export class WelcomeOfferComponent implements OnInit {
  welcomeOfferForm: FormGroup;
  popupVisible: boolean;
  saveButtonName: string;
  allowUpdate: boolean;
  dataSource: any;
  valueType = [
    { Id: 1, Text: 'Fixed' },
    { Id: 2, Text: 'Percentage' }];
  @ViewChild(DxDataGridComponent) public datagridBasePrice: DxDataGridComponent;
  constructor(public loadingSwitchService: LoadingSwitchService, public adminService: AdminService, public formBuilder: FormBuilder) {
    this.welcomeOfferForm = this.formBuilder.group({
      Own: [null, [Validators.required]],
      Reff: [null]
    });

  }

  ngOnInit() {
    this.loadingSwitchService.loading = true;
    this.adminService.GetGiftAmount().subscribe((data: any) => {
      if (data.Errors == undefined) {
        this.dataSource = data;
      }
      this.loadingSwitchService.loading = false;
    });
    this.saveButtonName = 'Edit';
    this.allowUpdate = false;
  }


  onToolbarPreparing(event) {
    var toolbarItems = event.toolbarOptions.items;
    toolbarItems.forEach(function (item) {
      item.visible = false;
    });
  }

  onSaveClick() {
    if (this.datagridBasePrice.instance.hasEditData()) {
      this.loadingSwitchService.loading = true;
      this.datagridBasePrice.instance.saveEditData();
      this.adminService.UpdateGiftAmount(this.dataSource).subscribe((data: any) => {
        if (data.Errors == undefined) {
          if (data == true) {
            this.popupVisible = true;
            this.saveButtonName = 'Edit';
            this.allowUpdate = false;
          }
          this.loadingSwitchService.loading = false;
        }
      });
    }
    else {
      this.saveButtonName = 'Save';
      this.allowUpdate = true;
  }
  }
  ClosePopUp() {
    this.popupVisible = false;
  }
}