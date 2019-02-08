import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders,HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Caption } from 'src/Models/HoroScope/Caption';



@Injectable()
export class CaptionDbService {
 
   // private url = this.commonService.getBaseUrlApi() + "/AtmApi";

    constructor(private http: HttpClient  ) {
 


    }

    GetCaption(langCode:string,caption:Caption)
{
   
    
   var arr=[];
    if(langCode=="KAN")
    {
        caption.Nityapanchanga='¤vÀå ¥ÀAZÁAUÀ';
        caption.ShakaVarsha='UÀvÀ±Á°ªÁºÀ£À ±ÀPÀªÀµÀð';
        caption.Kollam='PÉÆÃ®A§ªÀµÀð';
        caption.Samvathsara='¸ÀAªÀvÀìgÀ';
        caption.Aayana='CAiÀÄ£À ';
        caption.Ruthu='IÄvÀÄ';
        caption.ChandraMasa='ZÁAzÀæªÀiÁ¸À';
        caption.SouraMasa='¸ËgÀªÀiÁ¸À';
        caption.Paksha='¥ÀPÀë';
        caption.MahaNakshatra='ªÀÄºÁ£ÀPÀëvÀæ';
        caption.NityaTithi='wy';
        caption.NityaNakshatra='¤vÀå£ÀPÀëvÀæ';
        caption.ChandrarkaYoga='ZÀAzÁæPÀð AiÉÆÃUÀ';
        caption.NityaKarana='PÀgÀt';
        caption.VishaGhati='«µÀWÀn';
        caption.AmrithaGhati='CªÀÄÈvÀWÀn';
        caption.Grahachakram='UÀæºÀ ZÀPÀæA'
        caption.CaptionRight="DªÀgÀtzÀ M¼ÀUÉ UÀAmÉ ¤«ÄµÀzÀ°è §gÉ¢gÀÄvÀÛzÉ."
        caption.GocharaPhala="UÉÆÃZÁgÀ ¥sÀ®"
    }
    else if(langCode=="ENG")
    {
      

        caption.Nityapanchanga='Nitya Panchanga';
        caption.ShakaVarsha='Shaka Varsha';
        caption.Kollam='Kollam';
        caption.Samvathsara='Samvathsara';
        caption.Aayana='Aayana ';
        caption.Ruthu='Ruthu';
        caption.ChandraMasa='Chandr Masa';
        caption.SouraMasa='Soura Masa';
        caption.Paksha='Paksha';
        caption.MahaNakshatra='Maha Nakshatra';
        caption.NityaTithi='Nitya Tithi';
        caption.NityaNakshatra='Nitya Nakshatra';
        caption.ChandrarkaYoga='Chandrarka Yoga';
        caption.NityaKarana='Nitya Karana';
        caption.VishaGhati='Visha Ghati';
        caption.AmrithaGhati='Amritha Ghati';
        caption.Grahachakram='Graha Chakram'
        caption.CaptionRight="Note : Hour minute format is used inside the parenthesis."
        caption.GocharaPhala="Gochara Phala"
      
    }
   else if(langCode=="HIN")
    {
      

        caption.Nityapanchanga='ÌlÉirÉ mÉÇcÉÉÇaÉ';
        caption.ShakaVarsha='zÉÉÍsÉuÉÉWûlÉ zÉMüuÉwÉï';
        caption.Kollam='MüÉåsÉÇoÉ uÉwÉï';
        caption.Samvathsara='xÉÇuÉixÉU';
        caption.Aayana='ArÉlÉ ';
        caption.Ruthu='GiÉÑ';
        caption.ChandraMasa='cÉÉÇSìqÉÉxÉ(AqÉÉÇiÉ)';
        caption.SouraMasa='xÉÉæUqÉÉxÉ';
        caption.Paksha='mÉ¤É';
        caption.MahaNakshatra='qÉWûÉlÉ¤É§É(xÉÔrÉï)';
        caption.NityaTithi='ÌiÉÍjÉ';
        caption.NityaNakshatra='ÌlÉirÉlÉ¤É§É';
        caption.ChandrarkaYoga='cÉÇSìÉMïü rÉÉãaÉ';
        caption.NityaKarana='MüUhÉ';
        caption.VishaGhati='ÌuÉwÉbÉÌOûMüÉ';
        caption.AmrithaGhati='AqÉ×iÉbÉÌOûMüÉ';
        caption.Grahachakram='aÉëWû cÉ¢Çü(sÉalÉ MÑÇüQûsÉÏ)'
        caption.CaptionRight="±ÉlÉ SåÇ : MüÉå¹Mü Måü AÇSU bÉÇOûÉ AÉæU ÍqÉlÉOû qÉåÇ ÌSrÉÉ aÉrÉÉ Wæû|"
        caption.GocharaPhala="aÉÉåcÉU TüsÉ"
    
      
    }
   else if(langCode=="MAL")
    {
      
        caption.Nityapanchanga='Nitya Panchanga';
        caption.ShakaVarsha='Shaka Varsha';
        caption.Kollam='Kollam';
        caption.Samvathsara='Samvathsara';
        caption.Aayana='Aayana ';
        caption.Ruthu='Ruthu';
        caption.ChandraMasa='Chandr Masa';
        caption.SouraMasa='Soura Masa';
        caption.Paksha='Paksha';
        caption.MahaNakshatra='Maha Nakshatra';
        caption.NityaTithi='Nitya Tithi';
        caption.NityaNakshatra='Nitya Nakshatra';
        caption.ChandrarkaYoga='Chandrarka Yoga';
        caption.NityaKarana='Nitya Karana';
        caption.VishaGhati='Visha Ghati';
        caption.AmrithaGhati='Amritha Ghati';
        caption.Grahachakram='Graha Chakram'
        caption.CaptionRight="Note : Hour minute format is used inside the parenthesis."
        caption.GocharaPhala="Gochara Phala"
    
      
    }
   else if(langCode=="TAM")
    {
      

        caption.Nityapanchanga='¿¢òÂ Àïº¡í¸õ';
        caption.ShakaVarsha='¸¼ó¾ „¡Ä¢Å¡†É ÅÕ¼õ';
        caption.Kollam='¦¸¡øÄõ (ÅÕ„õ)';
        caption.Samvathsara='¾Á¢ú ÅÕ„õ';
        caption.Aayana='«ÂÉÀ ';
        caption.Ruthu='ÀÕÅ ¸¡Äõ (ÕÐ)';
        caption.ChandraMasa='ºó¾¢Ã Á¡¾õ';
        caption.SouraMasa='¾Á¢ú §¾¾¢';
        caption.Paksha='Àì„õ';

        caption.NityaTithi='¾¢¾¢';
        caption.NityaNakshatra='Ý÷§Â¡¾Â ¿ðº.';
        caption.ChandrarkaYoga='¿¢òÂ §Â¡¸õ';
        caption.NityaKarana='¸Ã½õ';
        caption.VishaGhati='Å¢„ ¿¡Æ¢¨¸';
        caption.AmrithaGhati='«õÕ¾ ¿¡Æ¢¨¸';
        caption.Grahachakram='Ã¡º¢ ¸ð¼õ'
        caption.CaptionRight="Å¢§º„ ÌÈ¢ôÒ  : þ¨¼ôÀ¢ÈÅÃÖìÌÃ¢Â «¨¼ôÒìÌÈ¢¸Ùû Á½¢, ¿¢Á¢¼  Ó¨È§Â À¢ýÀüÈôÀÎ¸¢ÈÐ."
        caption.GocharaPhala="§¸¡º¡Ã¡ ÀÄý"
    
      
    }
    return arr;
}

  
  

  
 


   

}
