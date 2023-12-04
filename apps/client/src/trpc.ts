import { AppRouter } from '@server/trpc/trpc.router';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;
export type Euc = RouterOutput['getAllEucWithRetailers'][0];
export type NewEuc = RouterInput['addEuc'];
export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
});
