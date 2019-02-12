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
        caption.GocharaPhala="UÉÆÃZÁgÀ ¥sÀ®";

        caption.JanmaNakshthra="d£Àä £ÀPÀëvÀæ";
        caption.JanmaRashi="d£Àä gÁ²"
        caption.Aroodha="DgÀÆqsÀ"
        caption.SunRise="¸ÀÆAiÉÆÃðzÀAiÀÄ"
        caption.Udaya="GzÀAiÀÄ"
        caption.SunSet="¸ÀÆAiÀiÁð¸ÀÛ"
        caption.Lagnamsha="®UÁßA±À"
        caption.DinaMana="¢£ÀªÀiÁ£À"
        caption.ChatraRashi="bÀvÀæ gÁ² "
        caption.SprushtangaRashi="¸ÀàöÈµÁÖAUÀ gÁ² "
        caption.Tambula="vÁA§Æ® gÁ²"
        caption.ChandradishtithaRashi="ZÀAzÁæ¢ü¶×vÀ gÁ² "
        caption.MoonRise="ZÀAzÉÆæÃzÀAiÀÄ";
        caption.MoonSet="ZÀAzÁæ¸ÀÛ"; 
        caption.Rahu="gÁºÀÄPÁ®";
        caption.Gulika="UÀÄ½PÀPÁ®"; 
        caption.Yama="AiÀÄªÀÄPÀAlPÀ"; 
        caption.Tithi="wy"; 
        caption.Nak="£ÀPÀëvÀæ"; 
     
        caption.Yoga="AiÉÆÃUÀ";
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


        caption.JanmaNakshthra="Janma Nakshthra";
        caption.JanmaRashi="Janma Rashi";
        caption.Aroodha="Aroodha";
        caption.SunRise="SunRise";
        caption.Udaya="Udaya";
        caption.SunSet="SunSet";
        caption.Lagnamsha="Lagnamsha";
        caption.DinaMana="Dinamana";
        caption.ChatraRashi="Chatra Rashi";
        caption.SprushtangaRashi="Sprushtanga Rashi";
        caption.Tambula="Tambula Rashi";
        caption.ChandradishtithaRashi="Chandradishtitha Rashi";
        caption.MoonRise="MoonRise";
        caption.MoonSet="MoonSet"; 
        caption.Rahu="Rahu";
        caption.Gulika="Gulika"; 
        caption.Yama="Yama"; 
        caption.Tithi="Tithi"; 
        caption.Nak="Nakshatra"; 
     
        caption.Yoga="Yoga";
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

        caption.JanmaNakshthra="";
        caption.JanmaRashi="";
        caption.Aroodha="";
        caption.SunRise="";
        caption.Udaya="";
        caption.SunSet="";
        caption.Lagnamsha="";
        caption.DinaMana="";
        caption.ChatraRashi="";
        caption.SprushtangaRashi="";
        caption.Tambula="";
        caption.ChandradishtithaRashi="";

        caption.MoonRise="";
        caption.MoonSet=""; 
        caption.Rahu="";
        caption.Gulika=""; 
        caption.Yama=""; 
        caption.Tithi=""; 
        caption.Nak=""; 
     
        caption.Yoga="";
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
        caption.GocharaPhala="Gochara Phala";

        caption.JanmaNakshthra="Janma Nakshthra";
        caption.JanmaRashi="Janma Rashi";
        caption.Aroodha="Aroodha";
        caption.SunRise="SunRise";
        caption.Udaya="Udaya";
        caption.SunSet="SunSet";
        caption.Lagnamsha="Lagnamsha";
        caption.DinaMana="Dinamana";
        caption.ChatraRashi="Chatra Rashi";
        caption.SprushtangaRashi="Sprushtanga Rashi";
        caption.Tambula="Tambula Rashi";
        caption.ChandradishtithaRashi="Chandradishtitha Rashi";

        caption.MoonRise="MoonRise";
        caption.MoonSet="MoonSet"; 
        caption.Rahu="Rahu";
        caption.Gulika="Gulika"; 
        caption.Yama="Yama"; 
        caption.Tithi="Tithi"; 
        caption.Nak="Nakshatra"; 
     
        caption.Yoga="Yoga";
      
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
        caption.JanmaNakshthra="";
        caption.JanmaRashi="";
        caption.Aroodha="";
        caption.SunRise="";
        caption.Udaya="";
        caption.SunSet="";
        caption.Lagnamsha="";
        caption.DinaMana="";
        caption.ChatraRashi="";
        caption.SprushtangaRashi="";
        caption.Tambula="";
        caption.ChandradishtithaRashi="";

        caption.MoonRise="";
        caption.MoonSet=""; 
        caption.Rahu="";
        caption.Gulika=""; 
        caption.Yama=""; 
        caption.Tithi=""; 
        caption.Nak=""; 
     
        caption.Yoga="";



    }
    return arr;
}

  
  

  
 


   

}
