import { Router } from "express";
import { redis } from "../redis.js";
import { createChannel, EXCHANGE } from "../rabbitmq.js";

const router = Router();

// save token
router.post("/save-token", async (req, res) => {
  const { userId, token } = req.body;

  await redis.sadd(`user:${userId}`, token);

  res.json({ message: "Token saved" });
});

// send notification
router.post("/notify", async (req, res) => {
  const { userId, title, body } = req.body;

  const channel = await createChannel();

//   channel.publish(
//     EXCHANGE,
//     userId,
//     Buffer.from(JSON.stringify({ userId, title, body }))
//   );

  channel.publish(
  EXCHANGE,
  "notify", // ✅ FIXED ROUTING KEY
  Buffer.from(JSON.stringify({ userId, title, body }))
);
  res.json({ message: "Notification queued" });
});

export default router;