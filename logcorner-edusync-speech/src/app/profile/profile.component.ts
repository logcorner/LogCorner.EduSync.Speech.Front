import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthError, InteractionRequiredAuthError } from 'msal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  subscriptions: Subscription[] = [];

  profile: any;
  constructor(private authService: MsalService, private http: HttpClient) { }

  ngOnInit(): void {
   this.profile = this.authService.getAccount().name;

   console.log(this.profile);
  }

 
}
