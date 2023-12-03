import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../node_modules/.pnpm/@prisma+client@5.6.0_prisma@5.6.0/node_modules/.prisma/client/index.d';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://admin:password123@localhost:5434/euc?schema=public',
        },
      },
    });
  }
}
