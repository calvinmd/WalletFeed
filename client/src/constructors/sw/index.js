import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import axios from '@/constructors/axios'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')
  ;
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

const registerAndSubScribe = async () => {
  const registration = await runtime.register()
  console.log(registration);

  const subscribeOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      'BHEa09WcrSPva3MOvSIXlsGRqEVlfjOvVrT-S5_T__9U9uImayVsaa7xfT8d0Cx_5A3hBIV5lB7fiCsMWdbS5mE'
    ),
  };

  const pushSubscription = await registration.pushManager.subscribe(subscribeOptions)
  // pushSubscription.unsubscribe()
  console.log('PushSubscription: ', JSON.stringify(pushSubscription));
  const subscribeResponse = await axios.post('/api/v1/subscriptions/subscribe', { subscription: pushSubscription})
  console.log('subscribeResponse: ', subscribeResponse);
}

if ('serviceWorker' in navigator) {
  registerAndSubScribe()
}
