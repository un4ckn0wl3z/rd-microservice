import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RdKafkaService } from './rdkafka.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [AppService,RdKafkaService],
})
export class AppModule {}
