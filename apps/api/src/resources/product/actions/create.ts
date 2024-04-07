import { z } from 'zod';

import { AppKoaContext, Next, AppRouter, Product } from 'types';

import { validateMiddleware } from 'middlewares';

import productService from '../product.service';

const schema = z.object({
  title: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  authorId: z.string(),
});

interface ValidatedData extends z.infer<typeof schema> {
  product: Product;
}

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { title } = ctx.validatedData;

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const {
    title,
    price,
    imageUrl,
    authorId,
  } = ctx.validatedData;
  
  const product = await productService.insertOne({
    title,
    price,
    imageUrl,
    isSold: false,
    authorId,
  });

  ctx.body = { product };
}

export default (router: AppRouter) => {
  router.post('/create', validateMiddleware(schema), validator, handler);
};
