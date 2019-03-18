import * as amqp from "amqplib/callback_api";

import config from "../config";

// Simple client to deliver messages for a queue
amqp.connect(config.host, function(error, conn) {
  if (error) {
    console.log(error);
    return false;
  }

  // Create the channel and delivery messages
  conn.createChannel(function(error, channel) {
    const queue = "one-to-one";
    const message = "Hi.";

    channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(message));

    console.log(" [x] Sent 'Hello World!'");
  });

  // Close the connection
  setTimeout(function() {
    conn.close();
    process.exit(0);
  }, 500);
});
