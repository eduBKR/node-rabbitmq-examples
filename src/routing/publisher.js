import * as amqp from "amqplib/callback_api";

import config from "../config";

// Send message directly to a exchange
amqp.connect(config.host, function(error, conn) {
  if (error) {
    console.log(error);
    return false;
  }

  // Create the channel and delivery the message through using the direct type
  conn.createChannel(function(error, channel) {
    const exchange = "routing-logs";

    var message = process.argv.slice(2).join(" ") || "Log Example";

    var args = process.argv.slice(2);
    var severity = args.length > 1 ? args[0] : "INFO";

    channel.assertExchange(exchange, "direct", { durable: false });
    channel.publish(exchange, severity, Buffer.from(message));

    console.log(" [x] Sent %s", message);
  });

  // Close the connection
  setTimeout(function() {
    conn.close();
    process.exit(0);
  }, 500);
});
