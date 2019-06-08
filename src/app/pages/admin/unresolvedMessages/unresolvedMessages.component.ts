import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/Services/AdminService/AdminService';
import { PartyService } from 'src/Services/PartyService/PartyService';


@Component({
    templateUrl: 'unresolvedMessages.component.html',
    styleUrls: [ './unresolvedMessages.component.scss' ]
  })
  
  export class UnResolvedMessagesComponent {
    @ViewChild(DxDataGridComponent) public datagridBasePrice: DxDataGridComponent;  
    dataSource: any;
    popupVisible: boolean;
    Id: any;
    unresolvedMessagesSearchForm: FormGroup;
    commentForm: FormGroup;
    GetMessages: { From: any; To: any; };
    dateinDateFormat: Date;

    constructor(public formBuilder: FormBuilder, public router: Router, public adminService: AdminService,
        public partyService: PartyService, public loadingSwitchService: LoadingSwitchService) {
            this.dateinDateFormat = new Date();
            this.unresolvedMessagesSearchForm = this.formBuilder.group({
            From: new Date(),
            To: new Date()
        });
        this.commentForm = this.formBuilder.group({
            Message:['',[Validators.required]]
        });
    }
    OnSubmit_click(){
        this.loadingSwitchService.loading=true;
        this.GetMessages = {
            From:this.unresolvedMessagesSearchForm.controls['From'].value,
            To:this.unresolvedMessagesSearchForm.controls['To'].value,
        }
        this.partyService.GetMessages(this.GetMessages).subscribe((data: any) => {
            if (data.Errors == undefined) {
                this.loadingSwitchService.loading=false;
                this.dataSource = data;
            }
        });
    }
    OnResolve_click(promoItem){
        this.popupVisible=true;
        this.Id=promoItem.data.Id;
    }
    ClosePopUp(){
        this.loadingSwitchService.loading=true;
        var ResolveMessage = {
            Message:this.commentForm.controls['Message'].value,
            Id:this.Id,
        }
        this.partyService.ResolveMessage(ResolveMessage).subscribe((data: any) => {
            if (data.Errors == undefined) {
                this.popupVisible = false;
                if (data == true) {
                    this.partyService.GetMessages(this.GetMessages).subscribe((data: any) => {
                        if (data.Errors == undefined) {
                            this.dataSource = data;
                            this.loadingSwitchService.loading = false;
                        }
                    });
                }
            }
        });
      }
  }