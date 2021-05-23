import { Component, OnDestroy, OnInit } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';
import { b2cPolicies, isIE } from '../app-config';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit , OnDestroy {
  subscriptions: Subscription[] = [];
  isAuthenticated = false;
  isIframe = false;
  constructor(private authService: MsalService, private broadcastService: BroadcastService) { }

  ngOnInit(): void{

    this.isIframe = window !== window.parent && !window.opener;
    this.checkAccount();
    const loginSuccessSubscription = this.broadcastService.subscribe('msal:loginSuccess', (success) => {

    if (success.idToken.claims.acr === b2cPolicies.names.resetPassword) {
      window.alert('Password has been reset successfully. \nPlease sign-in with your new password');
      return this.authService.logout();
    }
    console.log('login succeeded. id token acquired at: ' + new Date().toString());
    console.log(success);

    this.checkAccount();
      });


    const loginFailureSubscription = this.broadcastService.subscribe('msal:loginFailure', (error) => {
        console.log('login failed');
        console.log(error);

        if (error.errorMessage) {
          // Check for forgot password error
          // tslint:disable-next-line: max-line-length
          // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
          if (error.errorMessage.indexOf('AADB2C90118') > -1) {
            if (isIE) {
              this.authService.loginRedirect(b2cPolicies.authorities.resetPassword);
            } else {
              this.authService.loginPopup(b2cPolicies.authorities.resetPassword);
            }
          }
        }
      });

    this.subscriptions.push(loginSuccessSubscription);
    this.subscriptions.push(loginFailureSubscription);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  checkAccount(): void {
    this.isAuthenticated = !!this.authService.getAccount();
  }

  async signIn(): Promise<void> {
    if (isIE) {
      this.authService.loginRedirect();
    } else {
      this.authService.loginPopup();
    }
  }

  signOut(): void {
    this.authService.logout();
  }
}
