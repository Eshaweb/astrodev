import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Combosource, MuhurthaConfig, PartymuhurthaConfig } from 'src/Models/Input1DTO';
import { HttpService } from 'src/Services/Error/http.service';
@Component({
  templateUrl: 'generalConfig.component.html',
  styleUrls: ['./generalConfig.component.scss']
})

export class GeneralConfigComponent implements OnInit {

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

  constructor(private http: HttpClient, private httpService: HttpService) { }

  ngOnInit() {

    this.muhurthaConfig = new MuhurthaConfig();
    this.partymuhurthaconfig = new PartymuhurthaConfig();
    var endPoint = "Muhurtha/GetMuhurthaList";
    this.httpService.Get(endPoint).subscribe((data: any) => {
      this.combosource = data;
      var endPoint2 = "PartyConfig/GetMuhurthaconfig?PartyMastId=1";
      this.httpService.Get(endPoint2).subscribe((data: MuhurthaConfig[]) => {
        this.partymuhurthaconfig.Config = data;
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
    var endPoint3 = "PartyConfig/UpdateMuhurthaConfig";
    this.httpService.Post(endPoint3, this.partymuhurthaconfig).subscribe((data: any) => {
      alert(data);

    });
  }
}
