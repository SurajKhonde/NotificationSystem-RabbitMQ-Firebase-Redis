importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "XXXXXXXXXXX",
  authDomain: "XXXX.firebaseapp.com",
  projectId: "XXX-XXX-XXXX",
  storageBucket: "test-web-XXXX.firebases.XX",
  messagingSenderId: "XXX8XXX6357XXXX",
  appId: "XX:XXXXXXX:web:XXXXXXe2",
  measurementId: "G-XXXXXXXX"
});


const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});