import { z } from 'zod';

import { userSchema } from 'schemas';

export interface User extends z.infer<typeof userSchema> {
  accessToken?: string
}
