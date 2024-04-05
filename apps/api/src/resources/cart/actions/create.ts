import { z } from 'zod';

import { AppKoaContext, Next, AppRouter } from 'types';

import { validateMiddleware } from 'middlewares';

import cartService from '../cart.service';
import { userService } from 'resources/user';

const schema = z.object({
  userId: z.string(),
});

type ValidatedData = z.infer<typeof schema>;

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { userId } = ctx.validatedData;
  
  const isUserExists = await userService.exists({ _id:userId });
  const isCartExist = await cartService.exists({ userId });

  ctx.assertClientError(isUserExists, {
    userId: 'User with this id is not found',
  });

  ctx.assertClientError(!isCartExist, {
    userId: 'Cart for this user already exist',
  });
  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const {
    userId,
  } = ctx.validatedData;
  
  const cart = await cartService.insertOne({
    userId,
    cart:[],
    history:[],
  });

  ctx.body = { cart };
}

export default (router: AppRouter) => {
  router.post('/create', validateMiddleware(schema), validator, handler);
};
