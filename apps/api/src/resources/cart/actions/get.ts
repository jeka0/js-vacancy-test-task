import { z } from 'zod';
import { AppKoaContext, AppRouter } from 'types';
import { validateMiddleware } from 'middlewares';

import cartService from '../cart.service';
import { Cart } from 'types';
import { getRecord } from 'resources/record/actions/getRecord';

const schema = z.object({
  userId: z.string(),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const {
    userId,
  } = ctx.validatedData;
  const cart:Cart = await cartService.findOne({ userId });
  cart.cartArray = await Promise.all(cart.cart.map(async recordId=>getRecord(recordId)));
  
  cart.historyArray = await Promise.all( cart.history.map(async recordId=>getRecord(recordId)));
  ctx.body = {
    ...cart,
  };
}

export default (router: AppRouter) => {
  router.get('/', validateMiddleware(schema), handler);
};
