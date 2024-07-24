import * as amqplib from "amqplib";
import { logger } from "./logger";

const queueName = process.env.ASSET_CHANNEL;

export const producerClient = async (data: any) => {
  let connection;
  try {
    connection = await amqplib.connect("amqp://guest:guest@localhost:5672/");
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName!, { durable: false });
    channel.sendToQueue(queueName!, Buffer.from(JSON.stringify(data)));
    logger.info({
      message: "Data sent to Message Queue",
      data: data,
    });
    await channel.close();
  } catch (error) {
    logger.info({
      message: "Failed send data to Message Queue",
      data: error,
    });
  } finally {
    if (connection) await connection.close();
  }
};
