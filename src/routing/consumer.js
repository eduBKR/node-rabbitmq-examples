import amqp from "amqplib/callback_api";

import config from "../config";

const args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: consumer.js [INFO] [WARN] [ERROR]");
  process.exit(1);
}

// Simple consumer to process the messages, to usage:
// yarn start src/routing/consumer INFO
amqp.connect(config.host, function(error, conn) {
  if (error) {
    console.log(error);
    return false;
  }

  // Open the connection
  conn.createChannel(function(error, channel) {
    const exchange = "routing-logs";

    channel.assertExchange(exchange, "direct", { durable: false });

    channel.assertQueue("", { exclusive: true }, function(error, queue) {
      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        queue.queue
      );

      args.forEach(function(severity) {
        channel.bindQueue(queue.queue, exchange, severity);
      });

      channel.consume(
        queue.queue,
        function(message) {
          if (message.content) {
            console.log(
              " [x] %s: '%s'",
              message.fields.routingKey,
              message.content.toString()
            );
          }
        },
        { noAck: true }
      );
    });
  });
});
