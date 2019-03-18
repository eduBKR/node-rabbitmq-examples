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
    const queue = "task-queue";

    channel.assertQueue(queue, { durable: true });

    // This tells RabbitMQ not to give more than one message to a worker at a time
    channel.prefetch(1);

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    // Listen the channel
    channel.consume(
      queue,
      function(message) {
        const secs = message.content.toString().split(".").length - 1;

        console.log(" [x] Received %s", message.content.toString());

        setTimeout(function() {
          console.log(" [x] Done");

          // Send the response to confirm the message as processed
          channel.ack(message);
        }, secs * 1000);
      },
      { noAck: false }
    );
  });
});
