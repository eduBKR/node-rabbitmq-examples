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
    const exchange = "logs";
    var message = process.argv.slice(2).join(" ") || "Log Example";

    channel.assertExchange(exchange, "fanout", { durable: false });
    channel.publish(exchange, "", Buffer.from(message));

    console.log(" [x] Sent %s", message);
  });

  // Close the connection
  setTimeout(function() {
    conn.close();
    process.exit(0);
  }, 500);
});
