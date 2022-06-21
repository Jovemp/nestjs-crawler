import { Module } from '@nestjs/common';
import { EventControolerModule } from './controllers/events.module';

@Module({
  imports: [EventControolerModule],
})
export class AppModule {}
