import * as Kafka from 'node-rdkafka';

export class DummyProduceEvent {
    static topic: string = 'dummyproduce.event'
    message: Kafka.Message
}