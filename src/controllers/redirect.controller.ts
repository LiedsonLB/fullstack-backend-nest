import {
  Controller,
  Get,
  Param,
  Res,
  NotFoundException,
  GoneException,
} from '@nestjs/common';
import { UrlsService } from '../services/urls.service';
import type { Response } from 'express';

@Controller()
export class RedirectController {
  constructor(private service: UrlsService) {}

  @Get(':code')
  async redirect(@Param('code') code: string, @Res() res: Response) {
    const url = await this.service.findByCode(code);

    if (!url) throw new NotFoundException('Link not found');

    if (url.expiresAt && new Date(url.expiresAt) < new Date()) {
      throw new GoneException('Link expired');
    }

    await this.service.incrementHits(code);
    return res.redirect(url.originalUrl);
  }
}
