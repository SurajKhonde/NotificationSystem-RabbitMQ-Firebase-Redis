import admin from "firebase-admin";
import serviceAccount from "./serviceAccount.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

export const messaging = admin.messaging();