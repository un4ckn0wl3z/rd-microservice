import { Injectable, Logger } from '@nestjs/common';
import * as Kafka from 'node-rdkafka';

@Injectable()
export class RdKafkaService {

    private logger = new Logger(RdKafkaService.name)

    private m_consumer: Kafka.KafkaConsumer;
    private m_producer: Kafka.Producer;
    
    constructor(){
        this.m_consumer = new Kafka.KafkaConsumer({
            'metadata.broker.list': 'localhost:9092',
            'group.id': 'kafka'
      
        }, {})
      
        this.m_producer = new Kafka.Producer({
            'metadata.broker.list': 'localhost:9092',
            'client.id': 'kafka'          
        })

        this.consumer.connect()
        this.logger.log("[+] Kafka.KafkaConsumer initialized")

        this.producer.connect()
        this.logger.log("[+] Kafka.Producer initialized")

    }
    
    get consumer(): Kafka.KafkaConsumer {
        return this.m_consumer
    }
    get producer(): Kafka.Producer {
        return this.m_producer
    }
}
