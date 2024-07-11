import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import * as Kafka from 'node-rdkafka';

@Controller()
export class AppController {

  private logger = new Logger(AppController.name)

  private consumer: Kafka.KafkaConsumer;
  private producer: Kafka.Producer;

  constructor(
    private readonly appService: AppService,
  ) {

    this.consumer = new Kafka.KafkaConsumer({
      'metadata.broker.list': 'localhost:9092',
      'group.id': 'kafka'

  }, {})

  this.producer = new Kafka.Producer({
      'metadata.broker.list': 'localhost:9092',
      'client.id': 'kafka'          
  })

  this.consumer.connect()
  this.consumer
      .on('ready', () => {
          this.consumer.subscribe(['test']);
          this.consumer.consume();
      })
      .on('data', (data) => {
          switch (data.topic) {
            case 'test':
              this.handleTestTopic(data)
              break;
            default:
              this.logger.log('[-] UNKNOWN TOPIC.')
              break;
          }
      });
  }



  public handleTestTopic(message: Kafka.Message){
    this.logger.log(`[+] MESSAGE INCOMMING: ${message.value.toString()}`)
  }

}
