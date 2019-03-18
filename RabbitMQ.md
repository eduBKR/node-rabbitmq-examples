# RabbitMQ

RabbitMQ use AMQP 0.9.1, if you need more information, please read
https://www.rabbitmq.com/tutorials/amqp-concepts.html

## Exchanges

Exchanges are AMQP 0-9-1 entities where messages are sent. Exchanges take a
message and route it into zero or more queues.

### Direct

A direct exchange delivers messages to queues based on the message routing key.
A direct exchange is ideal for the unicast routing of messages (although they
can be used for multicast routing as well).

### Topic

Topic exchanges route messages to one or many queues based on matching between a
message routing key and the pattern that was used to bind a queue to an exchange.
The topic exchange type is often used to implement various publish/subscribe
pattern variations. Topic exchanges are commonly used for the multicast routing
of messages.

### Headers

A headers exchange is designed for routing on multiple attributes that are more
easily expressed as message headers than a routing key. Headers exchanges ignore
the routing key attribute. Instead, the attributes used for routing are taken
from the headers attribute. A message is considered matching if the value of the
header equals the value specified upon binding.

### Fanout

A fanout exchange routes messages to all of the queues that are bound to it and
the routing key is ignored. If N queues are bound to a fanout exchange, when a
new message is published to that exchange a copy of the message is delivered to
all N queues. Fanout exchanges are ideal for the broadcast routing of messages.

## Queues

Queues in the AMQP 0-9-1 model are very similar to queues in other message - and
task-queueing systems: they store messages that are consumed by applications.
