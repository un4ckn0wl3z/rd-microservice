import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ConsumeEvent } from './events/consume.event';
import { RdKafkaService } from './rdkafka.service';
import { Topic } from './enum/topic.enum';

@Controller()
export class AppController {

  private logger = new Logger(AppController.name)

   constructor(
    private readonly appService: AppService,
    private eventEmitter: EventEmitter2,
    private rd: RdKafkaService
  ) {

  this.rd.consumer
      .on('ready', () => {
        this.rd.consumer.subscribe([Topic.DUMMY_CONSUME_TOPIC]);
        this.rd.consumer.consume();
      })
      .on('data', (payload) => {
        const consumeEvent = new ConsumeEvent();
        consumeEvent.payload = payload
        this.eventEmitter.emit(
          consumeEvent.payload.topic,
          consumeEvent
        );
      });
  }


  @OnEvent(Topic.DUMMY_CONSUME_TOPIC, { async: true })
  public async handleDummyConsumeEvent(event: ConsumeEvent) : Promise<void> {
    
    this.logger.log(`[+] INCOMMING MESSAGE FROM TOPIC ${event.payload.topic}: ${event.payload.value.toString()}`)
    this.logger.log(`[+] PAYLOAD: ${event.payload.value.toString()}`)

    this.rd.producer.produce(Topic.DUMMY_PRODUCE_TOPIC,
      null,
      Buffer.from(this.appService.getHello()),
      'Stormwind',
      Date.now(),
    );
  }

}
