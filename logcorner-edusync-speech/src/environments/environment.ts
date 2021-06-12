// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { b2cPolicies } from "src/app/app-config";

export const environment = {
  production: false,
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
  hubNotificationUrl :'http://localhost:5000/logcornerhub'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
