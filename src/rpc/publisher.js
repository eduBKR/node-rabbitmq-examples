import amqp from "amqplib/callback_api";

import config from "../config";

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: publisher.js number");
  process.exit(1);
}

// Publisher that await for consumer response
amqp.connect(config.host, function(error, conn) {
  conn.createChannel(function(error, channel) {
    channel.assertQueue("", { exclusive: true }, function(error, queue) {
      var id = generateUuid();
      var number = parseInt(args[0]);

      console.log(" [x] Requesting fib(%d)", number);

      channel.consume(
        queue.queue,
        function(message) {
          if (message.properties.correlationId == id) {
            console.log(" [.] Got %s", message.content.toString());

            setTimeout(function() {
              conn.close();
              process.exit(0);
            }, 500);
          }
        },
        { noAck: true }
      );

      channel.sendToQueue("rpc-queue", Buffer.from(number.toString()), {
        correlationId: id,
        replyTo: queue.queue
      });
    });
  });
});

function generateUuid() {
  return (
    Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
  );
}
