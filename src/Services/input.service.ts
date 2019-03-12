import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Accordian, RadioSource, NumericRadioSource, ComboSource } from 'src/Models/inputdto2';



@Injectable()
export class InputService {
 
  

    constructor(private http: HttpClient  ) {
 


    }
    accordian: Accordian[] = [
        { id: "1", name: "Dasha Type" },
        { id: "2", name: "Dasha Start" },
        { id: "3", name: "Dasha Prediction" },
     
        { id: "4", name: "Ayanamsha" },
        { id: "5", name: "Astaka Varga Type" },
     
        { id: "6", name: "Bhava Phal" },
        { id: "7", name: "Match Making" },
        { id: "8", name: "Adhipathi Phal" },
        { id: "9", name: "Sadesathi Shani" },
        { id: "10", name: "SunRise/SunSet" },
     
        { id: "11", name: "Chart Type" },
        { id: "12", name: "Moudya Settings" },
      
    ];
    ayanamsha:RadioSource[]=[
        { id: "LH", name: "Lahari" },
   { id: "RN", name: "Raman" },
   { id: "UD", name: "User Defined" }]

   dashastart:RadioSource[]=[  { id: "SD", name: "System Data" },
   { id: "FA", name: "From Age" },
  
    
 ];
 dashatype:NumericRadioSource[]=[  { id: 365.25, name: "365.25 Days" },
 { id: 360, name: "360.00 Days" }];

 astakavarga:RadioSource[]=[ { id: "BJ", name: "Brihath Jathaka" },
 { id: "BP", name: "Brihath Parashara" },{ id: "JA", name: "Jathaka Desha" }]


 Bahvaphala:RadioSource[]=[ { id: "B", name: "Bhava Phala Based on Bhava Chakram" }, { id: "G", name: "Bhava Phala Based on Graha Chakram" }]
   

   

   
  
   
    Adipatathaphala:RadioSource[]=[{ id: "B", name: "Adhipathi Phala Based on Bhava Chakram" }, { id: "G", name: "Adhipathi Phala Based on Graha Chakram" }]
    sunriseset:NumericRadioSource[]=[{ id: 1, name: "Center" },{ id: 2, name: "Upper Limb" }]


    charttypesource:ComboSource[] = [
        { id: "N", name: "North" },
        { id: "E", name: "East" },
        { id: "S", name: "South" },

    ]

  
  

  
 


   

}
