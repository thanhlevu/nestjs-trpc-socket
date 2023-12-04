import { z } from 'zod';

export const eucSchema = z.object({
  id: z.string(),
  productName: z.string(),
  brand: z.string(),
  tire: z.number(),
  maxSpeed: z.number(),
  range: z.number(),
  weight: z.number(),
  suspension: z.boolean(),
  bluetooth: z.boolean(),
});

export const eucCreateInput = eucSchema.omit({ id: true });

export const eucResponse = z.array(eucSchema);
