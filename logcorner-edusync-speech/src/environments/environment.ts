// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  commandAPI : 'https://localhost:6001/api',
  queryAPI : 'http://localhost:7000/api',
  hubNotificationUrl :'http://localhost:5000/logcornerhub', 
   azureAdB2C : {
    clientId: 'b2eb11d2-ee05-486b-9f2c-e6daf595aea7',
    tenantName :'datasynchrob2c'
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
