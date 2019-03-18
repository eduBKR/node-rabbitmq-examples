import * as amqp from "amqplib/callback_api";

import config from "../config";

// Send message directly to a exchange
amqp.connect(config.host, function(error, conn) {
  if (error) {
    console.log(error);
    return false;
  }

  // Create the channel and delivery the message through using the fanout type
  conn.createChannel(function(error, channel) {
    const exchange = "topic-logs";

    var message = process.argv.slice(1).join(" ") || "Hello";

    var args = process.argv.slice(2);
    var key = args.length > 1 ? args[0] : "anonymous.info";

    channel.assertExchange(exchange, "topic", { durable: false });
    channel.publish(exchange, key, Buffer.from(message));

    console.log(" [x] Sent %s:'%s'", key, message);
  });

  // Close the connection
  setTimeout(function() {
    conn.close();
    process.exit(0);
  }, 500);
});
