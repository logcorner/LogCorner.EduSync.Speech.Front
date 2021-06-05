import { Configuration } from 'msal';
import { MsalAngularConfiguration } from '@azure/msal-angular';
export const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export const b2cPolicies = {
    names: {
        signUpSignIn: 'B2C_1_SignUpIn',
        resetPassword: 'B2C_1_PasswordReset',
        editProfile: 'B2C_1_ProfileEdit'
    },
    authorities: {
        signUpSignIn: {
            authority: 'https://datasynchrob2c.b2clogin.com/datasynchrob2c.onmicrosoft.com/B2C_1_SignUpIn'
        },
        resetPassword: {
            authority: 'https://datasynchrob2c.b2clogin.com/datasynchrob2c.onmicrosoft.com/B2C_1_PasswordReset'
        },
        editProfile: {
            authority: 'https://datasynchrob2c.b2clogin.com/datasynchrob2c.onmicrosoft.com/B2C_1_ProfileEdit'
        }
    }
};

export const apiConfigQuery: {b2cScopes: string[]; webApi: string} = {
    b2cScopes: ['https://datasynchrob2c.onmicrosoft.com/query/api/Speech.List'],
    webApi: 'https://localhost:6002/api',
};

export const apiConfigCommand: {b2cScopes: string[]; webApi: string} = {
    b2cScopes: ['https://datasynchrob2c.onmicrosoft.com/command/api/Speech.Create',
                'https://datasynchrob2c.onmicrosoft.com/command/api/Speech.Edit',
                'https://datasynchrob2c.onmicrosoft.com/command/api/Speech.Delete'],
    webApi: 'https://localhost:6001/api',
};


export const msalConfig: Configuration = {
    auth: {
        clientId: 'b2eb11d2-ee05-486b-9f2c-e6daf595aea7',
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        redirectUri: 'http://localhost:4200/',
        postLogoutRedirectUri: 'http://localhost:4200/',
        navigateToLoginRequestUrl: true,
        validateAuthority: false,
      },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set this to 'true' to save cache in cookies to address trusted zones limitations in IE
    },
};


export const loginRequest: {scopes: string[]} = {
    scopes: ['openid', 'profile'],
};


export const tokenRequestQuery: {scopes: string[]} = {
    scopes: apiConfigQuery.b2cScopes
};


export const tokenRequestCommand: {scopes: string[]} = {
    scopes: apiConfigCommand.b2cScopes
};

export const protectedResourceMap: [string, string[]][] = [
    [apiConfigQuery.webApi, apiConfigQuery.b2cScopes],
    [apiConfigCommand.webApi, apiConfigCommand.b2cScopes]
 ];

export const msalAngularConfig: MsalAngularConfiguration = {
    popUp: !isIE,
    consentScopes: [
        ...loginRequest.scopes,
        ...tokenRequestQuery.scopes,
        ...tokenRequestCommand.scopes,
    ],
    unprotectedResources: [], // API calls to these coordinates will NOT activate MSALGuard
    protectedResourceMap,     // API calls to these coordinates will activate MSALGuard
    extraQueryParameters: {}
};
// #endregion
