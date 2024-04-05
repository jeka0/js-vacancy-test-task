import { z } from 'zod';

import { recordSchema } from 'schemas';
import { Product } from 'product.types';

export interface Record extends z.infer<typeof recordSchema> {
  product?: Product;
}
