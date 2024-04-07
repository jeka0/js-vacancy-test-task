import { z } from 'zod';

import { cartSchema } from 'schemas';
import { Record } from 'record.types';

export interface Cart extends z.infer<typeof cartSchema> {
  cartArray: Array<Record>,
  historyArray: Array<Record>
}
