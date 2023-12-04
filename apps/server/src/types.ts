import { z } from 'zod';
import { eucCreateInput, eucResponse, eucSchema } from './prisma/schema';

export type Euc = z.infer<typeof eucSchema>;
export type EucCreateInput = z.infer<typeof eucCreateInput>;
export type EucResponse = z.infer<typeof eucResponse>;
