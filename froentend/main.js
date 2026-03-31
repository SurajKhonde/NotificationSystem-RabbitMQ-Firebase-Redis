import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getMessaging,
  getToken,
  onMessage
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "XXXXXXXyBfrKpflXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "XXXX-XXXX-XXXXXX.firebaXXXX.com",
  projectId: "XXstXX-web-X4XXXX",
  storageBucket: "XXXXt-web-XXXX.fXXXXXXX.XXX",
  messagingSenderId: "XXXXX363XXXXX",
  appId: "X:XXXX8XXXXXX:web:a5dXXXX3a585XXXXX",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function login() {
  try {
    const email = document.getElementById("email").value;

    if (!email) {
      alert("Enter email");
      return;
    }

    const userId = btoa(email);

    // ✅ Register service worker
    const registration = await navigator.serviceWorker.register(
      "/froentend/firebase-messaging-sw.js"
    );
    console.log("✅ Service Worker Registered");

    // ✅ Request permission
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      alert("Notification permission denied");
      return;
    }

    // ✅ Get token
    const token = await getToken(messaging, {
      vapidKey:
        "BJXXXXXrw0KXXXXXXXXXPGX9r61BnSIu4VUXXXXXXXXXX_jsXXXXXXXXXUrAcx6-C0PWUXERkODfy8",
      serviceWorkerRegistration: registration,
    });

    if (!token) {
      console.error("❌ No token received");
      return;
    }

    console.log("✅ Token:", token);

    // ✅ Send to backend
    const res = await fetch("http://loclhost:3000/save-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, token }),
    });

    const data = await res.json();
    console.log("✅ Backend response:", data);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

window.login = login;

// ✅ Foreground message listener
onMessage(messaging, (payload) => {
  console.log("📩 Foreground notification:", payload);

  // optional: show alert
  alert(payload.notification?.title + " - " + payload.notification?.body);
});