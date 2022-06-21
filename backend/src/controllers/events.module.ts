import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventController } from './events.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'downloadImage',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'MQ_COUNT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'download-image-received',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [EventController],
  controllers: [EventController],
})
export class EventControolerModule {}
