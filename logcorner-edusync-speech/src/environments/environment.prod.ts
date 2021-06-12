import { b2cPolicies } from "src/app/app-config";

export const environment = {
  production: true,
  commandAPI : 'http://localhost:5001/api',
  queryAPI : 'http://localhost:5002/api',
  OAuthSettings: {
     clientId: 'b2eb11d2-ee05-486b-9f2c-e6daf595aea7',
     authority: b2cPolicies.authorities.signUpSignIn.authority,
     redirectUri: 'http://localhost:4200',
     scopes: [
      'openid', 'profile'
     ]
   },
 
  hubNotificationUrl : 'http://localhost:8081/logcornerhub'
};
