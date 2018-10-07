const webpush = require('web-push');
 
// VAPID keys should only be generated only once.
// const vapidKeys = webpush.generateVAPIDKeys();
const vapidKeys = {
  privateKey: 'OqBphSyBCUjilRkj7fqMGzkaYRGlBg20OGwU4I11bUA',
  publicKey: 'BHEa09WcrSPva3MOvSIXlsGRqEVlfjOvVrT-S5_T__9U9uImayVsaa7xfT8d0Cx_5A3hBIV5lB7fiCsMWdbS5mE',
}
// webpush.setGCMAPIKey('142559804913');
webpush.setVapidDetails(
  'mailto:shain.codes@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

module.exports = webpush
 
// This is the same output of calling JSON.stringify on a PushSubscription
// const pushSubscription = {
//   endpoint: '.....',
//   keys: {
//     auth: 'yHTIS6eeZnHLK8-XO8MenSTPwePuPnnLswcUejRtCes',
//     p256dh: 'BCm6pqpkNXkU1vw6RV0YKlrSvnBzCxbi3zCkJFqF0ktO-__GXSyXqSNH-IljT3FASFfpnrDHsu63ep0uBP6TyQg',
//     // BF7hDZNqkZPyrYuOKLgLipkWR6bzxnarNPMDHS_nCK_-q3zazrOI-swFkViXz2MREOdSR8_v16ySWjUrPtu2Y_s // firebase
//   }
// };
 
// webpush.sendNotification(pushSubscription, 'Your Push Payload Text');