import amqp from "amqplib";

const EXCHANGE = "notification_exchange";
const QUEUE = "notification_queue";

export async function startConsumer(handler: (msg: any) => void) {
  const conn = await amqp.connect("amqp://localhost");
  const channel = await conn.createChannel();

  await channel.assertExchange(EXCHANGE, "direct", { durable: true });
  await channel.assertQueue(QUEUE, { durable: true });

//   await channel.bindQueue(QUEUE, EXCHANGE, "");
//   await channel.bindQueue(QUEUE, EXCHANGE, "#");
await channel.bindQueue(QUEUE, EXCHANGE, "notify");
  channel.consume(QUEUE, (msg: any) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());
    handler(data);

    channel.ack(msg);
  });
}