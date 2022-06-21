import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQController } from './rabbitmq.controller';
import { CrawlerService } from '../service/crawler.service';
import { NestCrawlerModule } from 'nest-crawler';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from 'src/data/database.module';
import { FileService } from 'src/service/file.service';
import { FileProviders } from 'src/provider/file.providers';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'MQ_COUNT',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: [configuration().host_rabbitmq],
            queue: configuration().download_image_receive_count,
            queueOptions: {
              durable: false,
            },
          },
        }),
        imports: [ConfigModule],
      },
      {
        name: 'MQ_RECEIVED',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: [configuration().host_rabbitmq],
            queue: configuration().download_image_received,
            queueOptions: {
              durable: false,
            },
          },
        }),
        imports: [ConfigModule],
      },
    ]),
    HttpModule,
    NestCrawlerModule,
    DatabaseModule,
  ],
  controllers: [RabbitMQController],
  providers: [CrawlerService, FileService, ...FileProviders],
})
export class RabbitMQModule {}
