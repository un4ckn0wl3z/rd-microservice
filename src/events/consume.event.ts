import * as Kafka from 'node-rdkafka';

export class ConsumeEvent {
    payload: Kafka.Message
}