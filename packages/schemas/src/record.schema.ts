import { z } from 'zod';
import dbSchema from './db.schema';

export const recordSchema = dbSchema.extend({
  quantity: z.number(),
  date: z.date().optional().nullable(),
  productId: z.string(),
}).strict();
