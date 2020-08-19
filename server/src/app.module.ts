import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SendFileInterceptor } from './sendFile.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
    providers: [AppService, SendFileInterceptor],
})
export class AppModule {}
