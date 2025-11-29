/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUrlDto } from '../dto/create-url.dto';
import { nanoid } from 'nanoid';
import { addDays } from 'date-fns';

@Injectable()
export class UrlsService {
  constructor(private prisma: PrismaService) {}

  private async generateUniqueCode(len = 6) {
    let shortCode;
    do {
      shortCode = nanoid(len);
    } while (await this.prisma.urls.findUnique({ where: { shortCode } }));
    return shortCode;
  }

  async create(dto: CreateUrlDto) {
    const { originalUrl, code: requestedCode, expiresInDays } = dto;

    const shortCode = requestedCode ?? (await this.generateUniqueCode(6));

    if (requestedCode) {
      const exists = await this.prisma.urls.findUnique({
        where: { shortCode: requestedCode },
      });
      if (exists) throw new BadRequestException('Code already in use');
    }

    const expiresAt = expiresInDays ? addDays(new Date(), expiresInDays) : null;

    const created = await this.prisma.urls.create({
      data: {
        originalUrl,
        shortCode,
        expiresAt,
      },
    });

    return created;
  }

  async findByCode(shortCode: string) {
    return this.prisma.urls.findUnique({ where: { shortCode } });
  }

  async incrementHits(shortCode: string) {
    return this.prisma.urls.update({
      where: { shortCode },
      data: { hits: { increment: 1 } },
    });
  }

  async list({ page = 1, perPage = 20 }: { page?: number; perPage?: number }) {
    const skip = (page - 1) * perPage;
    const [items, total] = await Promise.all([
      this.prisma.urls.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: perPage,
      }),
      this.prisma.urls.count(),
    ]);
    return { items, total, page, perPage };
  }

  async findById(id: number) {
    return this.prisma.urls.findUnique({ where: { id } });
  }
}
