import { INestApplication, Injectable } from '@nestjs/common';
import prisma from '@server/prisma';
import { eucCreateInput, eucSchema } from '@server/prisma/schema';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';
import { TrpcService } from './trpc.service';

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpc: TrpcService) {}

  appRouter = this.trpc.router({
    getAllEucWithRetailers: this.trpc.procedure.query(async () => {
      const createdUser = await prisma.euc.findMany();
      return createdUser;
    }),
    addEuc: this.trpc.procedure
      .input(eucCreateInput)
      .mutation(async ({ input }) => {
        const createdEuc = await prisma.euc.create({
          data: input,
        });
        return createdEuc;
      }),
    updateEuc: this.trpc.procedure
      .input(eucSchema)
      .mutation(async ({ input }) => {
        const updatedEuc = await prisma.euc.update({
          where: { id: input.id },
          data: input,
        });
        return updatedEuc;
      }),
    deleteEuc: this.trpc.procedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        const deletedEuc = await prisma.euc.delete({
          where: { id: input.id },
        });
        return deletedEuc;
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
