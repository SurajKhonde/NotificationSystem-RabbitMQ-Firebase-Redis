import { startConsumer } from "./rabbitMq.ts";
import { redis } from "./redis.js";
import { messaging } from "./firebase.js";

// startConsumer(async (data) => {

//   const { userId, title, body } = data;

//   const tokens = await redis.smembers(`user:${userId}`);
//     console.log(tokens)
//   for (const token of tokens) {
//     try {
//       await messaging.send({
//         token,
//         notification: {
//           title,
//           body,
//         },
//       });
//     } catch (err: any) {
//       if (err.code === "messaging/registration-token-not-registered") {
//         await redis.srem(`user:${userId}`, token);
//       }
//     }
//   }
// });

startConsumer(async (data) => {
  console.log("📩 Received from queue:", data);

  const { userId, title, body } = data;

  const tokens = await redis.smembers(`user:${userId}`);
  console.log("🎯 Tokens:", tokens);

  for (const token of tokens) {
    console.log("🚀 Sending to:", token);

    await messaging.send({
      token,
      notification: { title, body }
    });
  }
});