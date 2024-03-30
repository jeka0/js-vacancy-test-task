import { z } from 'zod';

import dbSchema from './db.schema';

export const productSchema = dbSchema.extend({

  title: z.string(),
  price: z.number(),

  isSold: z.boolean().optional().nullable(),

  avatarUrl: z.string().nullable().optional(),
}).strict();
