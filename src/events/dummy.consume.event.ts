import * as Kafka from 'node-rdkafka';

export class DummyConsumeEvent {
    static topic: string = 'dummyconsume.event'
    message: Kafka.Message
}