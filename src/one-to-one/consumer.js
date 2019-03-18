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
    const queue = "one-to-one";

    channel.assertQueue(queue, { durable: false });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    // Listen the channel
    channel.consume(
      queue,
      function(message) {
        console.log(" [x] Received %s", message.content.toString());
      },
      { noAck: true }
    );
  });
});
