import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import * as Kafka from 'node-rdkafka';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { DummyConsumeEvent } from './events/dummy.consume.event';
import { RdKafkaService } from './rdkafka.service';
import { DummyProduceEvent } from './events/dummy.produce.event';


@Controller()
export class AppController {

  private logger = new Logger(AppController.name)

   constructor(
    private readonly appService: AppService,
    private eventEmitter: EventEmitter2,
    private rd: RdKafkaService
  ) {

  this.rd.consumer.connect()
  this.rd.producer.connect()

  this.rd.consumer
      .on('ready', () => {
        this.rd.consumer.subscribe([DummyConsumeEvent.topic]);
        this.rd.consumer.consume();
      })
      .on('data', (message) => {
        this.eventEmitter.emit(
          message.topic,
          new DummyConsumeEvent().message = message,
        );
      });
  }


  @OnEvent(DummyConsumeEvent.topic)
  public async handleDummyConsumeEvent(message: Kafka.Message) : Promise<void> {
    
    this.logger.log(`[+] INCOMMING MESSAGE FROM TOPIC ${message.topic}: ${message.value.toString()}`)
    this.logger.log(`[+] PAYLOAD: ${message.value.toString()}`)

    this.rd.producer.produce(DummyProduceEvent.topic,
      null,
      Buffer.from('Awesome message'),
      'Stormwind',
      Date.now(),
    );
  }

}
