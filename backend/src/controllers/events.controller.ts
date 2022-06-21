import { Controller, Inject } from '@nestjs/common';
import { ClientRMQ, Ctx, EventPattern } from '@nestjs/microservices';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Data } from 'src/model/data.model';
import { Server, Socket } from 'socket.io';

@Controller()
@WebSocketGateway({ cors: { origin: '*' } })
export class EventController
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  server: any;

  constructor(@Inject('MATH_SERVICE') private readonly client: ClientRMQ) {}
  afterInit(server: any) {
    this.server = server;
    server.sockets.emit('received', 'teste');
    console.log(server);
  }

  @EventPattern('download-image-received')
  async handleCreatedEvent(data: string) {
    console.log(data);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }
  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('downloadImage')
  findAll(@MessageBody() data: Data): Observable<WsResponse<number>> {
    return this.client.emit('download-image', data);
  }

  @EventPattern('download-image-received')
  handleDownloadImageReceived(data: string) {
    console.log(data);
    console.log(this.server);
    this.server.emit('received', JSON.parse(data));
  }
}
