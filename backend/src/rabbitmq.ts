import amqp from "amqplib";

const EXCHANGE = "notification_exchange";

export async function createChannel() {
  const conn = await amqp.connect("amqp://localhost");
  const channel = await conn.createChannel();

  await channel.assertExchange(EXCHANGE, "direct", { durable: true });

  return channel;
}

export { EXCHANGE };