import { INestApplication, Injectable } from '@nestjs/common';
import prisma from '@server/prisma';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';
import { TrpcService } from './trpc.service';

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpc: TrpcService) {}

  appRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(z.object({ name: z.string().optional() }))
      .query(({ input }) => {
        return `Hello ${input.name || 'there'} !`;
      }),
    createUser: this.trpc.procedure
      .input(z.object({ name: z.string() }))
      .mutation(async ({ input }) => {
        console.log('>>> inputx', input);

        const createdUser = await prisma.euc.create({
          data: {
            name: input.name,
          },
        });
        return createdUser;
      }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
