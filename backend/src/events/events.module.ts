import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventsGateway } from './events.gateway';

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
    ]),
  ],
  providers: [EventsGateway],
})
export class EventsModule {}
