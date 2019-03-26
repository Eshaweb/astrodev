import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Caption } from 'src/Models/Caption';



@Injectable()
export class CaptionDbService {
    constructor(private http: HttpClient) {

    }

    GetCaption(langCode: string, caption: Caption) {
        var arr = [];
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
    
    
    
            caption.Sunday="D¢vÀå";
            caption.Monday="¸ÉÆÃªÀÄ"; 
            caption.Tuesday="ªÀÄAUÀ¼À";
            caption.Wednesday="§ÄzsÀ"; 
            caption.Thursday="UÀÄgÀÄ"; 
            caption.Friday="±ÀÄPÀæ"; 
            caption.Saturday="±À¤"; 
            caption.VeryGood="CvÀÄåvÀÛªÀÄ >60%";
            caption.VeryGoodDesc="	F ¢ªÀ¸ÀUÀ¼À°è ¤ªÀÄä CzÀÈµÀÖzÉÆA¢UÉ zÉÊªÀ ¸ÀºÁAiÀÄªÀÇ eÉÆvÉUÀÆqÀÄªÀÅzÀjAzÀ fÃªÀ£ÀzÀ G£ÀßwUÁV, ¸ÁzsÀ£ÉUÁV ªÀiÁqÀ¨ÉÃPÁzÀ ¥ÀæªÀÄÄR PÁAiÀÄð, ¤zsÁðgÀUÀ¼À£ÀÄß PÉÊUÉÆ¼ÀÄîªÀÅzÀÄ CvÀÄåvÀÛªÀÄªÁVzÉ.";
            caption.Good="GvÀÛªÀÄ 40% -60%";
            caption.GoodDesc="	F ¢ªÀ¸ÀUÀ¼À°è ¤ªÀÄä CzÀÈµÀÖªÀÅ GvÀÛªÀÄªÁVzÀÄÝ÷GzÉÆåÃUÀ, ªÀåªÀºÁgÀUÀ¼À°è GvÀÛªÀÄ ¸ÁzsÀ£ÉUÁV CzÀPÉÌ ¸ÀA§A¢üvÀ PÁAiÀÄðUÀ¼À£ÀÄß  F ¢£ÀUÀ¼À°è ªÀiÁqÀÄªÀÅzÀjAzÀ ±ÀÄ¨sÀªÁUÀÄªÀÅzÀÄ.";
            caption.Average="ªÀÄzsÀåªÀÄ 25% - 40%";
            caption.AverageDesc="	F ¢£ÀUÀ¼À°è  ¤ªÀÄä CzÀÈµÀÖ §®ªÀÅ PÀrªÉÄ¬ÄgÀÄªÀÅzÀjAzÀ ºÉaÑ£À ¥Àæw¥sÀ¯Á¥ÉÃPÉë¬Ä®èzÉ ªÀiÁqÀÄªÀ AiÀiÁªÀÅzÉÃ PÁAiÀÄðUÀ¼À£ÀÄß ªÀiÁqÀ§ºÀÄzÀÄ.";
            caption.NotBad="C£ÀÄPÀÆ®ªÀ®è  0 % - 25%";
            caption.NotBadDesc="	F ¢£ÀUÀ¼À°è  ¤ªÀÄUÉ AiÉÆÃUÀ§®ªÀÅ PÀrªÉÄ EzÀÄÝ AiÀiÁªÀÅzÉÃ ¥ÀæªÀÄÄR PÁAiÀÄðUÀ¼À£ÀÄß ªÀiÁqÀ®Ä F ¢ªÀ¸ÀUÀ¼ÀÄ GvÀÛªÀÄªÀ®è. zÉÊ£ÀA¢£À PÁAiÀÄðUÀ¼À£ÀÄß ªÀiÁqÀ§ºÀÄzÀÄ.";
            caption.Weak="zÀÄ§ð® < 0 %";
            caption.WeakDesc="	F ¢ªÀ¸ÀUÀ¼À°è ¤ªÀÄUÉ CzÀÈµÀÖ §®ªÀÇ, zÉÊªÀ ¸ÀºÁAiÀÄªÀÇ zÀÄ§ð®ªÁVgÀÄªÀÅzÀjAzÀ ¤vÀå PÀªÀÄðUÀ¼À ºÉÆgÀvÁV AiÀiÁªÀÅzÉÃ ¥ÀæzsÁ£À ¤tðAiÀÄUÀ¼À£ÀÄß PÉÊUÉÆ¼Àî®Ä  C£ÀÄPÀÆ®PÀgÀªÁVgÀÄªÀÅ¢®è.";
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
            caption.Sunday="Sun";
            caption.Monday="Mon"; 
            caption.Tuesday="Tue";
            caption.Wednesday="Wed"; 
            caption.Thursday="Thu"; 
            caption.Friday="Fri"; 
            caption.Saturday="Sat"; 
            caption.VeryGood="Very Good";
            caption.VeryGoodDesc="    Besides being lucky, you will get divine support too on these days.Therefore, you are advised to perform any important tasks or take major decisions  relating to your development on these days.";
            caption.Good="Good";
            caption.GoodDesc="    On these days you will be lucky. You will prosper in case you perform any important tasks relating to your career or business. ";
            caption.Average="Average";
            caption.AverageDesc="    On these days you will be less lucky. You may perform any task about which you are not keen on its success.";
            caption.NotBad="Not Bad";
            caption.NotBadDesc="    These days are not auspicious for you. Therefore these days are not suitable for performing any important tasks. However, you may perform any routine tasks.";
            caption.Weak="Weak";
            caption.WeakDesc="    These days besides being unlucky, you will be devoid of divine support. Therefore these days  are not suitable for  performing any tasks other than routine day to day work. ";
     
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
            caption.Sunday="UÌuÉuÉÉU";
            caption.Monday="xÉÉåqÉuÉÉU"; 
            caption.Tuesday="qÉÇaÉsÉuÉÉU";
            caption.Wednesday="oÉÑkÉuÉÉU"; 
            caption.Thursday="aÉÑÂuÉÉU"; 
            caption.Friday="zÉÑ¢üuÉÉU"; 
            caption.Saturday="zÉÌlÉuÉÉU"; 
            caption.VeryGood="AirÉÑ¨ÉqÉ > 60%";
            caption.VeryGoodDesc="ClÉ ÌSlÉÉåÇ qÉåÇ AÉmÉMüÐ iÉMüSÏU Måü xÉÉjÉ DµÉU MüÐ xÉWûÉrÉiÉÉ Måü pÉÏ xÉÉjÉ SålÉå xÉå ÌMüL eÉÉlÉåuÉÉsÉå mÉëqÉÑZÉ MüÉrÉÉåïÇ AÉæU ÄTæüxÉsÉÉåÇ MüÉå sÉålÉÉ oÉWÒûiÉ AcNûÉ Wæû|";
            caption.Good="E¨ÉqÉ 40% -60%";
            caption.GoodDesc="ClÉ ÌSlÉÉåÇ qÉåÇ AÉmÉMüÐ iÉMüSÏU AcNûÏ UWûMüU lÉÉæMüUÏ AÉæU MüÉUÉåoÉÉU qÉåÇ AcNûÏ xÉÉkÉlÉÉ Måü ÍsÉL ExÉxÉå xÉÇoÉÇÍkÉiÉ MüÉrÉÉåïÇ MüÉå MüUlÉå xÉå zÉÑpÉ WûÉåaÉÉ|";
            caption.Average="xÉÉkÉÉUhÉ 25% - 40%";
            caption.AverageDesc="ClÉ ÌSlÉÉåÇ qÉåÇ AÉmÉMüÐ iÉMüSÏU MüÉ oÉsÉ MüqÉ UWûlÉå Måü MüÉUhÉ erÉÉSÉ mÉëÌiÉTüsÉ Måü CÇiÉÄeÉÉU Måü ÌoÉlÉÉ ÌMüL eÉÉlÉåuÉÉsÉå MüÉåD pÉÏ MüÉrÉï MüU xÉMüiÉå WæÇû|";
            caption.NotBad="AlÉÑMÔüsÉSÉrÉMü lÉWûÏ 0 % - 25%";
            caption.NotBadDesc="ClÉ ÌSlÉÉåÇ qÉåÇ AÉmÉMüÉ rÉÉåaÉoÉsÉ MüqÉ UWûMüU MüÉåD pÉÏ mÉëqÉÑZÉ MüÉrÉï MüUlÉå Måü ÍsÉL rÉå ÌSlÉ AcNåû lÉWûÏÇ WæÇû| WûU UÉåÄeÉ MüÉ MüÉqÉ MüU xÉMüiÉå WæÇû| ";
            caption.Weak="SÒoÉïsÉ < 0 %";
            caption.WeakDesc="ClÉ ÌSlÉÉåÇ qÉåÇ AÉmÉMüÐ iÉMüSÏU MüÉ oÉsÉ AÉæU DµÉU MüÐ xÉWûÉrÉiÉÉ pÉÏ SÒoÉïsÉ UWûlÉå Måü MüÉUhÉ UÉåÄeÉ Måü MüÉqÉÉåÇ Måü AsÉÉuÉÉ MüÉåD pÉÏ mÉëqÉÑZÉ ÌlÉkÉÉïU sÉålÉå Måü ÍsÉL AlÉÑMÔüsÉMüÉUMü lÉWûÏÇ WæûÇ|";
        }
       else if(langCode=="MAL")
        {        
            caption.Nityapanchanga='dyZõ eºxMI';
            caption.ShakaVarsha='MZ qxmypxtd qKI';
            caption.Kollam='¥KxmøpªrI';
            caption.Samvathsara='sIpÄkI';
            caption.Aayana='AjdI';
            caption.Ruthu='EZ¡';
            caption.ChandraMasa='PxöÉixsI';
            caption.SouraMasa='¤s¦k ixsI';
            caption.Paksha='e±I';
            caption.MahaNakshatra='itxd±öZI';
            caption.NityaTithi='Zyay';
            caption.NityaNakshatra='dyZõ d±öZI';
            caption.ChandrarkaYoga='PöÉxªK ¥jxMI';
            caption.NityaKarana='KkYI';
            caption.VishaGhati='pyr dxoyK';
            caption.AmrithaGhati='Ai£Z dxoyK';
            caption.Grahachakram='öMtPöKI'
            caption.CaptionRight="öe. A :  BpkYÀyd¡×y« iYy¯¢l¡I iydyl÷¡I Bjy ¤KxU¡Àyky¯¡Ë¡."
            caption.GocharaPhala="¥MxPxk fmI";
    
            caption.JanmaNakshthra="RÍ d±öZ";
            caption.JanmaRashi="RÍ kxqy";
            caption.Aroodha="Bk¢XI";
            caption.SunRise="s¢¥kõxbjI";
            caption.Udaya="DbjI";
            caption.SunSet="s¢kõxsëI";
            caption.Lagnamsha="m²xIqI";
            caption.DinaMana="bydixdI";
            caption.ChatraRashi="QöZ kxqy";
            caption.SprushtangaRashi="sð£ræxIM kxqy";
            caption.Tambula="ZxIg¢m kxqy";
            caption.ChandradishtithaRashi="PöÉxcyrçyZ kxqy";
    
            caption.MoonRise="P¥öbxbjI";
            caption.MoonSet="PöÉxsëI"; 
            caption.Rahu="kxt¡";
            caption.Gulika="M¡nyK©"; 
            caption.Yama="Yama"; 
            caption.Tithi="Zyay"; 
            caption.Nak="d±öZI"; 
         
            caption.Yoga="Pöbxk§K ¥jxMI";
    
    
            caption.Sunday="Txjª";
            caption.Monday="Zy´¬"; 
            caption.Tuesday="¤PxÑ";
            caption.Wednesday="g¡c©"; 
            caption.Thursday="põxo"; 
            caption.Friday="¤p×y"; 
            caption.Saturday="qdy"; 
    
            caption.VeryGood="AZõ¡ÀiI > 60%";
            caption.VeryGoodDesc="     C¦ bypsµny« dyµn¡¤U hxMõ¥Àx¤UxeðI ¤¤bpxczdp¡I K¢¤Uj¡½xK¡ËZydx« ¤P¥Ð½Zxj s¡öecxd Kxkõµn¡I, Zzk¡ixdµn¡I ¤¤K¤¯x×¡ËZ§ DÀiixY§.";
            caption.Good="DÀiI 40% -60%";
            caption.GoodDesc="    C¦ bypsµny« dyµn¡¤U hxMõI DÀiixY§. D¥bõxMÀym¡I põptxkµnym¡I ¤i¶¤eð¼ öeKUdI Kxoá¤pjÜ§K¡ËZydxjy AZ¡ixjy gÊ¤eð¼ Kxkõµ¬ ¤Pjëx« q¡hKkixK¡ËZxY§. ";
            caption.Average="icõiI    25% - 40%";
            caption.AverageDesc="   C¦ bypsµny« dyµn¡¤U hxMõgmI K¡lpxjZydx« K¢U¡Z« ¥d¼µ¬ öeZz±y¯x¤Z ¤PÐ¡Ë GZ§ Kxkõp¡I ¤PÐxp¡ËZxY§. ";
            caption.NotBad="AciI      0 % - 25%";
            caption.NotBadDesc="   C¦ bypsµny« dyµ¬¯§ ¥jxMgmI K¡lpxY§. Hk¡ s¡öecxd Kxkõµn¡I ¤PÐ¡ËZyd§ C¦ bypsµ¬ DÀiimø. ¤¤bdIbyd Kxkõµ¬ ¤PÐxp¡ËZxY§.";
            caption.Weak="b¡ªgmI     < 0 %";
            caption.WeakDesc="   C¦ bypsµny« dyµ¬¯§ hxMõgmp¡I, ¤¤bpxczdp¡I b¡ªgmixjyky¯¡ËZydx« ¤¤bdIbyd Kxkõµnmøx¤Z,jx¤Zxk¡ s¡öecxd Zzk¡ixdµn¡I ¤¤K¤¯x×¡ËZ§ Ad¡K¢mKkixjyky¯¡Kjymø";
          
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
            caption.Sunday="»¡Â¢Ú";
            caption.Monday="¾¢í¸û"; 
            caption.Tuesday="¦ºùÅ¡ö";
            caption.Wednesday="Ò¾ý"; 
            caption.Thursday="Å¢Â¡Æý"; 
            caption.Friday="¦ÅûÇ¢"; 
            caption.Saturday="ºÉ¢";
            
            
            caption.VeryGood="Á¢¸×õ ¿ýÚ > 60%";
            caption.VeryGoodDesc="þó¿¡ð¸Ç¢ø ¾¡í¸û «¾¢÷‰¼õ ¿¢¨Èó¾ÅÃ¡¸§ÅÂ¢ÕôÀ£÷¸û - þÐÁðÎÁøÄ¡Ð ¦¾öÅò¾¢ý «ÕÇ¢¨É, ¬¾ÃÅ¢¨ÉÔõ ¦ÀÚÅ£÷¸û. ¬¨¸Â¡ø ¯ÁÐ Óý§ÉüÈõ º¡÷ó¾ ±ùÅ¢¾Á¡É¦Å¡Õ ¦ºÂÄ¡¸Â¢ÕôÀ¢Ûõ ºÃ¢, ±ùÅ¢¾Á¡É¦Å¡Õ ÓÊÅ¢¨É ±Îì¸§ÅñÊÂ¢ÕôÀ¢Ûõ ºÃ¢, «Åü¨È¦ÂøÄ¡õ þó¿¡ð¸Ç¢ø ÒÃ¢óÐ¦¸¡ûÇ§ÅñÎõ ±É þíÌ «È¢×Úò¾ôÀÎ¸¢ýÈÐ.";
            caption.Good="¿ýÚ 40% -60%";
            caption.GoodDesc="þó¿¡ð¸Ç¢ø ¾¡í¸û «¾¢÷‰¼õ ¦¸¡ñ¼ÅÃ¡¸Â¢ÕôÀ£÷¸û. ¯ÁÐ ¯ò¾¢§Â¡¸õ «øÄÐ Å¢Â¡À¡Ãõ º¡÷ó¾ ¦ºÂø¸¨Ç þó¿¡ð¸Ç¢ø ÒÃ¢ó¾¡ø «î¦ºÂø¸Ç¢ø ¾¡í¸û ¦ºÆ¢ôÀ¨¼ó¾¢ÎÅ£÷¸û.";
            caption.Average="º¡¾¡Ã½õ 25% - 40%";
            caption.AverageDesc="þó¿¡ð¸Ç¢ø ¯ÁÐ «¾¢÷‰¼ò¾¢ý ¿¢¨Ä Ì¨ÈÅ¡¸§ÅÂ¢ÕìÌõ. ¬¨¸Â¡ø ¦ÅüÈ¢¿¢¨Ä ¸¢ð¼ Å¡öôÒ¸Ùõ Ì¨ÈÅ¡¸§ÅÂ¢ÕìÌõ. ¬¨¸Â¡ø Óì¸¢ÂÁüÈ, ºÃ¡ºÃ¢Â¡¸ ÒÃ¢Ôõ ¦ºÂø¸¨Ç þó¿¡ð¸Ç¢ø ÒÃ¢óÐ¦¸¡ûÅÐ ¿ýÚ. Óì¸¢ÂòÐÅõÅ¡öó¾, Ò¾¢Â ¦ºÂø¸¨Ç ¾Å¢÷òÐÅ¢ÎÐõ ¿ýÚ.";
            caption.NotBad="«¾Áõ/¯ò¾ÁÁøÄ 0 % - 25%";
            caption.NotBadDesc="þó¿¡ð¸û ¯ÁìÌ ÀÄÉÇ¢ì¸¡Ð ÁüÚõ º¡¾¸ÁüÈ¦Å¡ýÈ¡¸¢Å¢Îõ. ¬¨¸Â¡ø Óì¸¢ÂòÐÅõ Å¡öó¾ ±ùÅ¢¾Á¡É¦Å¡Õ ¦ºÂ¨ÄÔõ þó¿¡ð¸Ç¢ø ÒÃ¢ó¾¢¼ìÜ¼¡Ð. ¬É¡ø ºÃ¡ºÃ¢Â¡¸ ÒÃ¢óÐÅÕõ ¦ºÂø¸¨Ç ÒÃ¢óÐì¦¸¡ûÇÄ¡õ.";
            caption.Weak="±¾¢÷Á¨È ÀÄý  < 0 %";
            caption.WeakDesc="þó¿¡ð¸û ¯ÁìÌ «¾¢÷‰¼ÁÇ¢ì¸¡Ð - «ÐÁðÎÁ¢ýÈ¢ ¦¾öÅò¾¢ý «ÛÜÄ§Á¡, «Õ§Ç¡ ¯ÁìÌ ¸¢ð¼¡¾ ¿¢¨ÄÔÓñÎ. ¬¨¸Â¡ø ºÃ¡ºÃ¢Â¡¸, ¾¢Éó§¾¡Õõ ÒÃ¢óÐÅÕõ ¦ºÂø¸¨Çò ¾Å¢÷òÐ, §ÅÚ ±ùÅ¢¾Á¡É ¦ºÂø¸¨ÇÔõ ÒÃ¢ó¾¢¼ þó¿¡ð¸û ¯ÁìÌ º¡¾¸Á¡¸ \ «¨ÁÅ§¾Â¢ø¨Ä.";
    
        }
        return arr;
    }
    










}
