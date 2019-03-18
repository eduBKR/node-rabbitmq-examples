# RabbitMQ Examples

This repo contains several examples of implementation of RabbitMQ.

## Examples:

- One-to-One: simple example of comunication between publisher and consumer.
- Work-Queues: example of time-consuming tasks among multiple workers, the first
  consumer will process the request. To use this example, run more than one consumer.
- Publish-subscribe: example using a specific exchange.
- Routing: the consumer respond only to specific routing key.
- Topic: the consumer respond only to specific topic.
- RPC: comunication between publisher and consumer.

## Setup

To run the application is necessary install the dependences, it can be possible
running the follow command: `yarn install`.

Besides, it is necessary the RabbitMQ running, the easiest way to get the service,
is using Docker, to enable the service, only run:

```bash
docker run -d --hostname rabbitmq --name rabbitmq rabbitmq:3-management
```

After that, is necessary update the `src/config.js` file and put the server host
to the publishers and consumers can get access to the queue.

The follow docker image contains a admin web app, and can get accesed on port: 15672,
with user `guest` and password `guest`.

## Running the examples

To run the examples, the `start` comand will execute the script, pass the file path,
such as:

```bash
yarn start src/one-to-one/consumer.js
```

## Docker Utils

- `docker ps`: list the containers.
- `docker logs --follow CONTAINER`: show and follow the container console log.
- `docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' CONTAINER`: show the container IP.
