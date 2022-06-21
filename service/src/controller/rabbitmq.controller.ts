import { HttpService } from '@nestjs/axios';
import { Controller, Inject } from '@nestjs/common';
import { ClientRMQ, EventPattern } from '@nestjs/microservices';
import { DataDTO } from 'src/model/data.model';
import { CrawlerService } from 'src/service/crawler.service';
import { createWriteStream } from 'fs';
import { FileService } from 'src/service/file.service';
import configuration from 'src/config/configuration';

@Controller()
export class RabbitMQController {
  constructor(
    @Inject('MQ_COUNT') private readonly client: ClientRMQ,
    @Inject('MQ_RECEIVED') private readonly clientReceived: ClientRMQ,
    private readonly crawlerService: CrawlerService,
    private readonly httpService: HttpService,
    private readonly fileService: FileService,
  ) {}

  /*@MessagePattern({ cmd: 'download-image' })
  downloadImage(@Payload() data: DataDTO) {
    console.log(data);
  }*/

  @EventPattern('download-image')
  async handleBookCreatedEvent(data: string) {
    console.log(data);
    const d: DataDTO = JSON.parse(data);
    const imagens: any[] = await this.crawlerService.scrape(d.url);
    this.client.emit(
      configuration().download_image_receive_count,
      JSON.stringify({
        quantidade: imagens.length,
        url_download: d.url,
      }),
    );

    imagens.forEach(async (element: string) => {
      const fileName = `image${new Date().getTime()}.png`;
      const writer = createWriteStream(`${__dirname}/../../public/${fileName}`);
      const image = {
        link: element,
        url: fileName,
      };

      try {
        const response = await this.httpService.axiosRef({
          url: element,
          method: 'GET',
          responseType: 'stream',
        });
        response.data.pipe(writer);
        this.fileService.create(image);
      } catch (err) {
        console.log(err);
        return this.clientReceived.emit(
          configuration().download_image_received,
          {
            erro: err.message,
            link: element,
            url_download: d.url,
          },
        );
      }

      return this.clientReceived.emit(
        configuration().download_image_received,
        JSON.stringify(image),
      );
    });
  }
}
