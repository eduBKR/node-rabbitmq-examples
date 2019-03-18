import amqp from "amqplib/callback_api";

import config from "../config";

amqp.connect(config.host, function(error, conn) {
  conn.createChannel(function(error, channel) {
    const queue = "rpc-queue";

    channel.assertQueue(queue, { durable: false });
    // Ensure only one consumer receive the message
    channel.prefetch(1);

    console.log(" [x] Awaiting RPC requests");

    channel.consume(queue, function reply(message) {
      const number = parseInt(message.content.toString());

      console.log(" [.] fib(%d)", number);

      const result = fibonacci(number);

      console.log("Result: %d", result);

      channel.sendToQueue(
        message.properties.replyTo,
        Buffer.from(result.toString()),
        { correlationId: message.properties.correlationId }
      );

      channel.ack(message);
    });
  });
});

function fibonacci(n) {
  if (n == 0 || n == 1) return n;
  else return fibonacci(n - 1) + fibonacci(n - 2);
}
