import * as Kafka from 'node-rdkafka';

export class ProduceEvent {
    payload: Kafka.Message
}