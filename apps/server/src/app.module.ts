import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TrpcModule } from '@server/trpc/trpc.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationGateway } from './notification/notification.gateway';

@Module({
  imports: [ConfigModule.forRoot(), TrpcModule],
  controllers: [AppController],
  providers: [AppService, NotificationGateway],
})
export class AppModule {}
