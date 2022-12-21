export const environment = {
  production: false,
  commandAPI : 'https://logcorner-apim-agic.azure-api.net/command/api',
  queryAPI :   'https://logcorner-apim-agic.azure-api.net/query/api/',
  isAuthenticationEnabled: true,
  hubNotificationUrl : 'https://kubernetes.agic.com/hub-notification-server/logcornerhub',
  //hubNotificationUrl : 'https://localhost:5001/hub-notification-server/logcornerhub',
  azureAdB2C : {
    clientId: '4a13c982-4b5f-406e-b636-fa9fd34ea8b0',
    tenantName :'workshopb2clogcorner'
  }
};
