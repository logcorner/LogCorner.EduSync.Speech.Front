import { Component, OnDestroy, OnInit } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';
import { b2cPolicies, isIE } from '../app-config';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit , OnDestroy {
  subscriptions: Subscription[] = [];
  isAuthenticated =false;
  constructor(private authService: MsalService,private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.checkAccount();
   let loginSuccessSubscription = this.broadcastService.subscribe('msal:loginSuccess', (success) => {
   
        console.log('login succeeded. id token acquired at: ' + new Date().toString());
        console.log(success);
  
        this.checkAccount();
      });
      this.subscriptions.push(loginSuccessSubscription);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  checkAccount() {
    this.isAuthenticated = !!this.authService.getAccount();
  }

  async signIn(): Promise<void> {
    if (isIE) {
      this.authService.loginRedirect();
    } else {
      this.authService.loginPopup();
    }
  }

  signOut() {
    this.authService.logout();
  }
}
