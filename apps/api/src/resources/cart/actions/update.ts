import _ from 'lodash';
import { z } from 'zod';

import { AppKoaContext, Next, AppRouter, Cart } from 'types';

import cartService from '../cart.service';

import { validateMiddleware } from 'middlewares';
import { getRecord } from 'resources/record/actions/getRecord';

const schema = z.object({
  id: z.string(),
  cart: z.array(z.string()).optional(),
  history: z.array(z.string()).optional(),
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
  const { cart, history } = ctx.validatedData;

  const query: any = {};
  if (cart)query.cart = cart;
  if (history)query.history = history;
  const updatedCart: Cart = await cartService.updateOne(
    { userId: ctx.request.params?.id },
    () => (query),
  );
  updatedCart.cartArray = await Promise.all( updatedCart.cart.map(async recordId=>{
    return getRecord(recordId);
  }));
  updatedCart.historyArray = await Promise.all( updatedCart.history.map(async recordId=>{
    return getRecord(recordId);
  }));
  ctx.body = updatedCart;
}

export default (router: AppRouter) => {
  router.put('/:id', validator, validateMiddleware(schema), handler);
};
