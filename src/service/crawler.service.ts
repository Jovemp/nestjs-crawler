import { Injectable } from '@nestjs/common';
import { NestCrawlerService } from 'nest-crawler';
import * as cheerio from 'cheerio';

@Injectable()
export class CrawlerService {
  constructor(private readonly crawler: NestCrawlerService) {}

  public async scrape(url: string): Promise<any> {
    interface HTML {
      html: string;
    }

    try {
      const data: HTML = await this.crawler.fetch({
        target: url,
        fetch: {
          html: {
            selector: 'html',
            how: 'html',
          },
        },
      });

      const result: string[] = [];

      cheerio
        .load(data.html)('img')
        .map((index, ele: any) => {
          result.push(
            ele.attribs.src.includes('http')
              ? ele.attribs.src
              : url + ele.attribs.src,
          );
        });
      return result;
    } catch (erro) {
      console.log(erro);
      return erro;
    }
  }
}
