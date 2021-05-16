// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  commandAPI : 'http://localhost:5001/api',
  queryAPI : 'http://localhost:5002/api',
  OAuthSettings: {
     clientId: 'a76237af-4e90-49ab-b8d4-8714fb261b1f',
     authority: 'https://login.microsoftonline.com/f12a747a-cddf-4426-96ff-ebe055e215a3',
     redirectUri: 'http://localhost:4200',
     scopes: [
          "https://leyegorayahoo.onmicrosoft.com/queryapi/api-access"
     ]
   }
   
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
