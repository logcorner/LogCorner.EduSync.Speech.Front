import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationParameters, AuthError, InteractionRequiredAuthError } from 'msal';
import { Subscription } from 'rxjs';
import { apiConfigCommand } from '../app-config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  subscriptions: Subscription[] = [];

  name: string;
  constructor(private authService: MsalService, private http: HttpClient) { }

  ngOnInit(): void {
    const account = this.authService.getAccount();
    this.name = account.name;
  }
}
