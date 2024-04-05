import { AppKoaContext, AppRouter, Next } from 'types';

import recordService from '../record.service';

type ValidatedData = never;
type Request = {
  params: {
    id: string;
  };
};

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const isRecordExists = await recordService.exists({ _id: ctx.request.params.id });

  ctx.assertError(isRecordExists, 'Record not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  await recordService.deleteSoft({ _id: ctx.request.params.id });

  ctx.body = {};
}

export default (router: AppRouter) => {
  router.delete('/:id', validator, handler);
};
