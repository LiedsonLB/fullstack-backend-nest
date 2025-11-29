import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UrlsService } from '../services/urls.service';
import { CreateUrlDto } from '../dto/create-url.dto';

@Controller('api/v1/urls')
export class UrlsController {
  constructor(private service: UrlsService) {}

  @Post()
  async create(@Body() dto: CreateUrlDto) {
    const url = await this.service.create(dto);
    return {
      id: url.id,
      code: url.shortCode,
      shortUrl: `${process.env.APP_URL || 'http://localhost:3000'}/${url.shortCode}`,
      originalUrl: url.originalUrl,
      expiresAt: url.expiresAt,
      hits: url.hits,
      createdAt: url.createdAt,
    };
  }

  @Get()
  async list(@Query('page') page = '1', @Query('per_page') per_page = '20') {
    const pageN = parseInt(page, 10);
    const perPageN = parseInt(per_page, 10);
    return this.service.list({ page: pageN, perPage: perPageN });
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    const num = parseInt(id, 10);
    const item = await this.service.findById(num);
    if (!item) throw new NotFoundException();
    return item;
  }
}
