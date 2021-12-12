/**
 * This file contains authentication parameters. Contents of this file
 * is roughly the same across other MSAL.js libraries. These parameters
 * are used to initialize Angular and MSAL Angular configurations in
 * in app.module.ts file.
 */

import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

 const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
 
 const tenantName = environment.azureAdB2C.tenantName;
 /**
  * Enter here the user flows and custom policies for your B2C application,
  * To learn more about user flows, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
  * To learn more about custom policies, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
  */
 export const b2cPolicies = {
     names: {
         signUpSignIn: "B2C_1_SignUpIn",
         editProfile: "B2C_1_ProfileEdit"
     },
     authorities: {
         signUpSignIn: {
             authority: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/B2C_1_SignUpIn`,
         },
         editProfile: {
             authority: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/B2C_1_ProfileEdit`
         }
     },
     authorityDomain: `${tenantName}.b2clogin.com`
 };
 
 /**
  * Configuration object to be passed to MSAL instance on creation. 
  * For a full list of MSAL.js configuration parameters, visit:
  * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
  */
  export const msalConfig: Configuration = {
     auth: {
         clientId: environment.azureAdB2C.clientId,//'b2eb11d2-ee05-486b-9f2c-e6daf595aea7', // This is the ONLY mandatory field that you need to supply.
         authority: b2cPolicies.authorities.signUpSignIn.authority, // Defaults to "https://login.microsoftonline.com/common"
         knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
         redirectUri: '/', // Points to window.location.origin. You must register this URI on Azure portal/App Registration.
     },
     cache: {
         cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
         storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge
     },
     system: {
         loggerOptions: {
             loggerCallback(logLevel: LogLevel, message: string) {
                 console.log(message);
             },
             logLevel: LogLevel.Verbose,
             piiLoggingEnabled: false
         }
     }
 }

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {

  commandApi: {
    endpoint: environment.commandAPI,
    scopes: [`https://${tenantName}.onmicrosoft.com/command/api/Speech.Create`,
             `https://${tenantName}.onmicrosoft.com/command/api/Speech.Edit`,
             `https://${tenantName}.onmicrosoft.com/command/api/Speech.Delete`],
  },
  queryApi: {
    endpoint: environment.queryAPI,
    scopes: [`https://${tenantName}.onmicrosoft.com/query/api/Speech.List`],
  },
  signalrServer: {
    endpoint: environment.hubNotificationUrl,
    scopes: [`https://${tenantName}.onmicrosoft.com/signalr/hub/event-notifier`],
  },
}

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: []
};