import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  subscriptions: Subscription[] = [];

  name: string;
  constructor(private msalService: MsalService) { }

  ngOnInit(): void {
     const account = this.msalService.instance.getAllAccounts();
    this.name = account[0].name; 
    //console.log('**ProfileComponent::ngOnInit:account[0]',account[0]);
   
  }
}
