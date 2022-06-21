import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [configuration().host_rabbitmq],
      queue: configuration().download_image,
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.listen();

  const appStatic = await NestFactory.create(AppModule);
  appStatic.setGlobalPrefix('api');

  await appStatic.listen(3004);
}
bootstrap();
