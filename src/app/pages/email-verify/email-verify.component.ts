import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/Services/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent {
  UserToken: { userid: any; Token: any; };
  message: string;
  constructor(public loginService: LoginService, 
    public route: ActivatedRoute, public router: Router) {
      this.route.queryParams.subscribe(params => {
          this.UserToken = {
              userid: params['userid'],
              Token: params['token']
          }
      });

      this.loginService.ValidateUserByToken(this.UserToken, (data) => {
          if (data.IsValid == true) {
              this.message = 'Success';
          }
      });
  }

  gotoLogin(){
      this.router.navigate(["/login-form"]);
  }

}
