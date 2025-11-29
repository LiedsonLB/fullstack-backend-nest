import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlsController } from './controllers/urls.controller';
import { UrlsService } from './services/urls.service';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { RedirectController } from './controllers/redirect.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, UrlsController, RedirectController],
  providers: [AppService, UrlsService, PrismaService],
})
export class AppModule {}
