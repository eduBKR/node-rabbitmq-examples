import * as amqp from "amqplib/callback_api";

import config from "../config";

// Simple client to deliver time-consuming tasks among multiple workers.
// Use the ARGs to pass the message, the amount of `.` will be the time that
// the message will spend to be completed
amqp.connect(config.host, function(error, conn) {
  if (error) {
    console.log(error);
    return false;
  }

  // Create the channel and delivery messages
  conn.createChannel(function(error, channel) {
    const queue = "task-queue";
    const message = process.argv.slice(2).join(" ") || "Task";

    // The durable option keep the queue
    channel.assertQueue(queue, { durable: true });

    // Mark the message as persistent
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

    console.log(" [x] Sent '%s'", message);
  });

  // Close the connection
  setTimeout(function() {
    conn.close();
    process.exit(0);
  }, 500);
});
