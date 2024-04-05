import _ from 'lodash';
import { z } from 'zod';

import { AppKoaContext, Next, AppRouter } from 'types';

import recordService from '../record.service';

import { validateMiddleware } from 'middlewares';

const schema = z.object({
  id: z.string(),
  quantity: z.number().min(1).optional(),
  isSold: z.boolean().optional().default(false),
}).strict();

type ValidatedData = z.infer<typeof schema>;
type Request = {
  params: {
    id: string;
  }
};

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const isRecordExists = await recordService.exists({ _id: ctx.request.params.id });

  ctx.assertError(isRecordExists, 'Record not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const { quantity, isSold } = ctx.validatedData;

  const query:any = {};
  if (isSold)query.date = new Date();
  if (quantity && quantity > 0 && quantity <= 50)query.quantity = quantity;
  const updatedRecord = await recordService.updateOne(
    { _id: ctx.request.params?.id },
    () => (query),
  );

  ctx.body = updatedRecord;
}

export default (router: AppRouter) => {
  router.put('/:id', validator, validateMiddleware(schema), handler);
};
