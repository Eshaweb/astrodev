import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Combosource, MuhurthaConfig, PartymuhurthaConfig } from 'src/Models/Input1DTO';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { ConfigerationService } from 'src/Services/ConfigerationService/ConfigerationService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
@Component({
  templateUrl: 'muhurthaConfig.component.html',
  styleUrls: ['./muhurthaConfig.component.scss']
})

export class MuhurthaConfigComponent implements OnInit {

  combosource: Combosource;
  muhurthaConfig: MuhurthaConfig;
  partymuhurthaconfig: PartymuhurthaConfig;
  isvisibleAdhikaMasa: boolean;
  isvisibleAshada: boolean;
  isvisibleIsRaviInSapthama: boolean;
  isvisibleIsKujaInSapthama: boolean;
  isvisibleIncludeSouraMonth: boolean;
  isvisibleIsRikthaThithi: boolean;
  isvisibleIsRahuInSapthama: boolean;
  isvisibleChandraInAnishta: boolean;
  isvisibleIsShaniInSapthama: boolean;
  isvisibleKritika: boolean;
  isvisibleVedaDosha: boolean;
  isvisibleDayTimeTithiNakshatra: boolean;
  isvisibleShalakaVedha: boolean;
  isvisibleRahuKala: boolean;
  isvisibleMoudyaMuhurtha: boolean;
  isvisibleKundalaYoga: boolean;
  isvisiblePushya: boolean;

  constructor(public loadingSwitchService:LoadingSwitchService, private configerationService: ConfigerationService) { }

  ngOnInit() {

    this.muhurthaConfig = new MuhurthaConfig();
    this.partymuhurthaconfig = new PartymuhurthaConfig();
    this.loadingSwitchService.loading = true;
    this.configerationService.GetMuhurthaList().subscribe((data: any) => {
      this.combosource = data;
      this.configerationService.GetMuhurthaconfig(StorageService.GetItem('PartyMastId')).subscribe((data: MuhurthaConfig[]) => {
        this.partymuhurthaconfig.Config = data;
        this.loadingSwitchService.loading = false;
      });
    });
  }


  onValueChanged(e) {
    this.muhurthaConfig = this.partymuhurthaconfig.Config.filter(a => a.MuhurthaType == e.value)[0]

    this.isvisibleAdhikaMasa = true;
    this.isvisibleAshada = true;
    this.isvisibleIsRaviInSapthama = true;
    this.isvisibleIsKujaInSapthama = true;
    this.isvisibleIncludeSouraMonth = true;
    this.isvisibleIsRikthaThithi = true;
    this.isvisibleIsRahuInSapthama = true;
    this.isvisibleChandraInAnishta = true;
    this.isvisibleIsShaniInSapthama = true;
    this.isvisibleKritika = true;
    this.isvisibleVedaDosha = true;
    this.isvisibleDayTimeTithiNakshatra = true;
    this.isvisibleShalakaVedha = true;
    this.isvisibleRahuKala = true;
    this.isvisibleMoudyaMuhurtha = true;
    this.isvisibleKundalaYoga = true;
    this.isvisiblePushya = true;


    switch (e.value) {
      case "viha":

        this.isvisibleKritika = false;
        this.isvisibleVedaDosha = false;
        this.isvisibleDayTimeTithiNakshatra = false;
        this.isvisibleKundalaYoga = false;

        break;
      case "upny":

        this.isvisibleIsRaviInSapthama = false;
        this.isvisibleIsKujaInSapthama = false;
        this.isvisibleIncludeSouraMonth = false;
        this.isvisibleIsRahuInSapthama = false;
        this.isvisibleIsShaniInSapthama = false;
        this.isvisibleKritika = false;
        this.isvisibleVedaDosha = false;
        this.isvisibleDayTimeTithiNakshatra = false;
        this.isvisibleShalakaVedha = false;
        this.isvisibleKundalaYoga = false;

        break;
      case "semt":
        this.isvisibleAdhikaMasa = false;
        this.isvisibleIsRaviInSapthama = false;
        this.isvisibleIsKujaInSapthama = false;
        this.isvisibleIncludeSouraMonth = false;
        this.isvisibleIsRikthaThithi = false;
        this.isvisibleIsRahuInSapthama = false;
        this.isvisibleIsShaniInSapthama = false;
        this.isvisibleKritika = false;
        this.isvisibleVedaDosha = false;
        this.isvisibleDayTimeTithiNakshatra = false;
        this.isvisibleShalakaVedha = false;
        this.isvisibleMoudyaMuhurtha = false;
        this.isvisibleKundalaYoga = false;

        break;
      case "anna":
        this.isvisibleAdhikaMasa = false;

        this.isvisibleIsRaviInSapthama = false;
        this.isvisibleIsKujaInSapthama = false;
        this.isvisibleIncludeSouraMonth = false;
        this.isvisibleIsRahuInSapthama = false;
        this.isvisibleIsShaniInSapthama = false;
        this.isvisibleKritika = false;
        this.isvisibleVedaDosha = false;
        this.isvisibleDayTimeTithiNakshatra = false;
        this.isvisibleShalakaVedha = false;
        this.isvisibleMoudyaMuhurtha = false;
        this.isvisibleKundalaYoga = false;

        break;
      case "krna":

        this.isvisibleIsRaviInSapthama = false;
        this.isvisibleIsKujaInSapthama = false;
        this.isvisibleIsRahuInSapthama = false;
        this.isvisibleIsShaniInSapthama = false;
        this.isvisibleKritika = false;
        this.isvisibleVedaDosha = false;
        this.isvisibleShalakaVedha = false;

        break;
      case "grpr":

        this.isvisibleIsRaviInSapthama = false;
        this.isvisibleIsKujaInSapthama = false;
        this.isvisibleIsRahuInSapthama = false;
        this.isvisibleIsShaniInSapthama = false;
        this.isvisibleKritika = false;
        this.isvisibleVedaDosha = false;
        this.isvisibleDayTimeTithiNakshatra = false;
        this.isvisibleShalakaVedha = false;
        this.isvisibleKundalaYoga = false;

        break;
      case "grab":

        this.isvisibleIsRaviInSapthama = false;
        this.isvisibleIsKujaInSapthama = false;
        this.isvisibleIsRahuInSapthama = false;
        this.isvisibleIsShaniInSapthama = false;
        this.isvisibleDayTimeTithiNakshatra = false;
        this.isvisibleShalakaVedha = false;
        this.isvisibleKundalaYoga = false;

        break;
      case "chal":

        this.isvisibleIsRaviInSapthama = false;
        this.isvisibleIsKujaInSapthama = false;
        this.isvisibleIncludeSouraMonth = false;
        this.isvisibleIsRahuInSapthama = false;
        this.isvisibleIsShaniInSapthama = false;
        this.isvisibleKritika = false;
        this.isvisibleVedaDosha = false;
        this.isvisibleDayTimeTithiNakshatra = false;
        this.isvisibleShalakaVedha = false;
        this.isvisibleKundalaYoga = false;

        break;


      case "dvpr":

        this.isvisibleIsRaviInSapthama = false;
        this.isvisibleIsKujaInSapthama = false;
        this.isvisibleIncludeSouraMonth = false;
        this.isvisibleIsRahuInSapthama = false;
        this.isvisibleIsShaniInSapthama = false;
        this.isvisibleKritika = false;
        this.isvisibleDayTimeTithiNakshatra = false;
        this.isvisibleShalakaVedha = false;
        this.isvisibleKundalaYoga = false

        break;
      case "vyar":

        this.isvisibleIsRaviInSapthama = false;
        this.isvisibleIsKujaInSapthama = false;
        this.isvisibleIsRahuInSapthama = false;
        this.isvisibleIsShaniInSapthama = false;
        this.isvisibleKritika = false;
        this.isvisibleVedaDosha = false;
        this.isvisibleDayTimeTithiNakshatra = false;
        this.isvisibleShalakaVedha = false;
        this.isvisibleKundalaYoga = false;

        break;
      case "udyo":

        this.isvisibleIsRaviInSapthama = false;
        this.isvisibleIsKujaInSapthama = false;
        this.isvisibleIsRahuInSapthama = false;
        this.isvisibleIsShaniInSapthama = false;
        this.isvisibleKritika = false;
        this.isvisibleVedaDosha = false;
        this.isvisibleDayTimeTithiNakshatra = false;
        this.isvisibleShalakaVedha = false;
        this.isvisibleKundalaYoga = false;

        break;
      case "vahn":

        this.isvisibleIsRaviInSapthama = false;
        this.isvisibleIsKujaInSapthama = false;
        this.isvisibleIsRahuInSapthama = false;
        this.isvisibleIsShaniInSapthama = false;
        this.isvisibleKritika = false;
        this.isvisibleVedaDosha = false;
        this.isvisibleDayTimeTithiNakshatra = false;
        this.isvisibleShalakaVedha = false;
        this.isvisibleKundalaYoga = false;

        break;
      case "tott":
        this.isvisibleAdhikaMasa = false;
        this.isvisibleAshada = false;
        this.isvisibleIsRaviInSapthama = false;
        this.isvisibleIsKujaInSapthama = false;
        this.isvisibleIncludeSouraMonth = false;
        this.isvisibleIsRikthaThithi = false;
        this.isvisibleIsRahuInSapthama = false;
        this.isvisibleIsShaniInSapthama = false;
        this.isvisibleKritika = false;
        this.isvisibleVedaDosha = false;
        this.isvisibleDayTimeTithiNakshatra = false;
        this.isvisibleShalakaVedha = false;
        this.isvisibleMoudyaMuhurtha = false;
        this.isvisibleKundalaYoga = false;
        this.isvisiblePushya = false;
        break;
      case "gopr":

        this.isvisibleIsRaviInSapthama = false;
        this.isvisibleIsKujaInSapthama = false;
        this.isvisibleIsRahuInSapthama = false;
        this.isvisibleIsShaniInSapthama = false;
        this.isvisibleKritika = false;
        this.isvisibleVedaDosha = false;
        this.isvisibleDayTimeTithiNakshatra = false;
        this.isvisibleShalakaVedha = false;
        this.isvisibleKundalaYoga = false;

        break;
      case "trvl":

        this.isvisibleIsRaviInSapthama = false;
        this.isvisibleIsKujaInSapthama = false;
        this.isvisibleIncludeSouraMonth = false;
        this.isvisibleIsRahuInSapthama = false;
        this.isvisibleChandraInAnishta = false;
        this.isvisibleIsShaniInSapthama = false;
        this.isvisibleKritika = false;
        this.isvisibleVedaDosha = false;
        this.isvisibleDayTimeTithiNakshatra = false;
        this.isvisibleShalakaVedha = false;
        this.isvisibleKundalaYoga = false;

        break;
      case "name":
        this.isvisibleAdhikaMasa = false;
        this.isvisibleAshada = false;
        this.isvisibleIsRaviInSapthama = false;
        this.isvisibleIsKujaInSapthama = false;
        this.isvisibleIncludeSouraMonth = false;
        this.isvisibleIsRikthaThithi = false;
        this.isvisibleIsRahuInSapthama = false;
        this.isvisibleIsShaniInSapthama = false;
        this.isvisibleKritika = false;
        this.isvisibleVedaDosha = false;
        this.isvisibleDayTimeTithiNakshatra = false;
        this.isvisibleShalakaVedha = false;
        this.isvisibleMoudyaMuhurtha = false;
        this.isvisibleKundalaYoga = false;
        this.isvisiblePushya = false;
        break;

      case "lapr":

        this.isvisibleIsRaviInSapthama = false;
        this.isvisibleIsKujaInSapthama = false;
        this.isvisibleIsRahuInSapthama = false;
        this.isvisibleIsShaniInSapthama = false;
        this.isvisibleKritika = false;
        this.isvisibleVedaDosha = false;
        this.isvisibleDayTimeTithiNakshatra = false;
        this.isvisibleShalakaVedha = false;
        this.isvisibleKundalaYoga = false;
        break;
      case "vida":

        this.isvisibleIsRaviInSapthama = false;
        this.isvisibleIsKujaInSapthama = false;
        this.isvisibleIncludeSouraMonth = false;
        this.isvisibleIsRahuInSapthama = false;
        this.isvisibleIsShaniInSapthama = false;
        this.isvisibleKritika = false;
        this.isvisibleVedaDosha = false;
        this.isvisibleDayTimeTithiNakshatra = false;
        this.isvisibleShalakaVedha = false;
        this.isvisibleKundalaYoga = false;
        break;
    }
  }
  save() {
    this.loadingSwitchService.loading = true;
    this.configerationService.UpdateMuhurthaConfig(this.partymuhurthaconfig).subscribe((data: any) => {
      this.loadingSwitchService.loading = false;
    });
  }
}
