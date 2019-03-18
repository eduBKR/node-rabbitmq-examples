import amqp from "amqplib/callback_api";

import config from "../config";

// Simple consumer to process the messages
amqp.connect(config.host, function(error, conn) {
  if (error) {
    console.log(error);
    return false;
  }

  // Open the connection
  conn.createChannel(function(error, channel) {
    const exchange = "logs";

    channel.assertExchange(exchange, "fanout", { durable: false });

    channel.assertQueue("", { exclusive: true }, function(error, queue) {
      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        queue.queue
      );

      channel.bindQueue(queue.queue, exchange, "");

      channel.consume(
        queue.queue,
        function(message) {
          if (message.content) {
            console.log(" [x] %s", message.content.toString());
          }
        },
        { noAck: true }
      );
    });
  });
});
