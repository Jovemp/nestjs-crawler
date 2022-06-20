import { Inject } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { ClientRMQ } from '@nestjs/microservices';
import { Data } from 'src/model/data.model';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(@Inject('MATH_SERVICE') private readonly client: ClientRMQ) {}

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
}
