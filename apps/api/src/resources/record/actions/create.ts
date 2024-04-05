import { z } from 'zod';

import { AppKoaContext, Next, AppRouter } from 'types';

import { validateMiddleware } from 'middlewares';

import recordService from '../record.service';

const schema = z.object({
  productId: z.string(),
});

type ValidatedData = z.infer<typeof schema>;


async function handler(ctx: AppKoaContext<ValidatedData>) {
  const {
    productId,
  } = ctx.validatedData;
  
  const record = await recordService.insertOne({
    productId,
    quantity: 1,
    date: null,
  });

  ctx.body = record;
}

export default (router: AppRouter) => {
  router.post('/create', validateMiddleware(schema), handler);
};
