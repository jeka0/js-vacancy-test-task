import { z } from 'zod';
import dbSchema from './db.schema';

export const productSchema = dbSchema.extend({

  title: z.string(),
  price: z.number(),
  isSold: z.boolean().optional().nullable(),
  imageUrl: z.string().nullable(),
  authorId: z.string(),
}).strict();
