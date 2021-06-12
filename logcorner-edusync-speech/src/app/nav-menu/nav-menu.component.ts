import { Component, OnInit } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';
import { HttpClient } from '@aspnet/signalr';
import { SignalRService } from '../services/signalr-service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit  {

  accountName = '';
  isLoggedIn = false;
  passwordResetAuthority =
    'https://datasynchrob2c.b2clogin.com/datasynchrob2c.onmicrosoft.com/B2C_1_PasswordReset';
  subscriptions: Subscription[] = [];

  constructor(
    private authService: MsalService,
    private broadcastService: BroadcastService,
    private signalRService : SignalRService
  ) {}

  ngOnInit(): void {
    let loginSuccessSubscription: Subscription;
    let loginFailureSubscription: Subscription;

    loginSuccessSubscription = this.broadcastService.subscribe(
      'msal:loginSuccess',
      (success) => {
        // We need to reject id tokens that were not issued with the default sign-in policy.
        // "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr")
        // To learn more about b2c tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
        if (success.idToken.claims['acr'] === 'B2C_1_SignUpIn') {
          window.alert(
            'Password has been reset successfully. \nPlease sign-in with your new password'
          );
          return this.authService.logout();
        }
        console.log(
          'login succeeded. id token acquired at: ' + new Date().toString()
        );
        console.log(success);
        this.checkAccount();
      }
    );

    loginFailureSubscription = this.broadcastService.subscribe(
      'msal:loginFailure',
      (error) => {
        console.log('login failed');
        console.log(error);

        // Check for forgot password error
        // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
        if (error.errorMessage.indexOf('AADB2C90118') > -1) {
          {
            this.authService.loginPopup({
              authority: this.passwordResetAuthority,
            });
          }
        }
        this.checkAccount();
      }
    );

    this.subscriptions.push(loginSuccessSubscription);
    this.subscriptions.push(loginFailureSubscription);
    this.checkAccount();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onLogin(): void {
    if (this.isLoggedIn) {
      this.authService.logout();
    } else {
      this.authService
        .loginPopup()
        .then((result) => {
          console.log('Login success', result);
          this.signalRService.StartConnection();
        })
        .catch((err) => {
          console.log('Login failed : ', err);
        });
    }
  }

  checkAccount(): void {
     this.isLoggedIn = !!this.authService.getAccount();
     if (this.isLoggedIn) {
      this.accountName = this.authService.getAccount().name;
    } else {
      this.accountName = '';
    }
  }
}
