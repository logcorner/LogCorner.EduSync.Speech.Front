// import { ClientSecretCredential, DefaultAzureCredential } from "@azure/identity";
// import { SecretClient } from "@azure/keyvault-secrets";
// import { Injectable } from '@angular/core';

// @Injectable()
// export class SecretService {
//   credential:ClientSecretCredential
//   vaultName = "logcornervaultfrontend";
//   url = `https://${vaultName}.vault.azure.net`;
//   client : SecretClient;
//   secretName = "AzureAdB2C--ClientId";
//   private()
//   {
//     this.credential = new ClientSecretCredential("","","");
//     this.client = new SecretClient(this.url, this.credential);
//   }
//   getSecret(secretName: string): string{
//     let latestSecret :string;
//     this.client.getSecret(secretName).
//     then((result) =>
//     {
//       console.log(`Latest version of the secret ${secretName}: `, result.value);
//       latestSecret = result.value
//     }).catch ((err) =>
//     {
//       console.log(`Error while getting the secret ${secretName}: `, err);
//       latestSecret = ""
//     });
//     return latestSecret 
//   }
// }






