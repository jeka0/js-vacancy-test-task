import _ from 'lodash';
import { z } from 'zod';

import { AppKoaContext, Next, AppRouter, Cart } from 'types';

import cartService from '../cart.service';

import { validateMiddleware } from 'middlewares';
import { getRecord } from 'resources/record/actions/getRecord';

const schema = z.object({
  id: z.string(),
  recordId: z.string(),
}).strict();

type ValidatedData = z.infer<typeof schema>;
type Request = {
  params: {
    id: string;
  }
};

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const isCartExists = await cartService.exists({ userId: ctx.request.params.id });

  ctx.assertError(isCartExists, 'Cart not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const { recordId } = ctx.validatedData;

  const cart : Cart = await cartService.findOne({ userId: ctx.request.params?.id });
  cart.cart.push(recordId);
  const updatedCart: Cart = await cartService.updateOne(
    { userId: ctx.request.params?.id },
    () => (cart),
  );
  updatedCart.cartArray = await Promise.all(updatedCart.cart.map(async irecordId=>{
    return getRecord(irecordId);
  }));
  updatedCart.historyArray = await Promise.all(updatedCart.history.map(async irecordId=>{
    return getRecord(irecordId);
  }));
  
  ctx.body = updatedCart;
}

export default (router: AppRouter) => {
  router.put('/add/:id', validator, validateMiddleware(schema), handler);
};
