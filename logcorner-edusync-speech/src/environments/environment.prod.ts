export const environment = {
  production: true,
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
