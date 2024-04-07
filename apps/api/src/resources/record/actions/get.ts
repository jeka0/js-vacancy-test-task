import { z } from 'zod';
import { AppKoaContext, AppRouter } from 'types';
import { validateMiddleware } from 'middlewares';

import { getRecord } from './getRecord';

const schema = z.object({
  id: z.string(),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const {
    id,
  } = ctx.validatedData;
  const record = await getRecord(id);
  ctx.body = {
    ...record,
  };
}

export default (router: AppRouter) => {
  router.get('/', validateMiddleware(schema), handler);
};
