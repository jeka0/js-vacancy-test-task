import { z } from 'zod';

import dbSchema from './db.schema';

export const cartSchema = dbSchema.extend({

  userId: z.string(),
  cart: z.array(z.string()),
  history: z.array(z.string()),
}).strict();
