import { z } from 'zod';

import { AppKoaContext, AppRouter, Next } from 'types';
import { productService } from '..';
import { userService } from '../../user';

import { validateMiddleware } from '../../../middlewares';

const schema = z.object({
  page: z.string().transform(Number).default('1'),
  perPage: z.string().transform(Number).default('10'),
  sort: z.object({
    createdOn: z.enum(['asc', 'desc']),
  }).default({ createdOn: 'desc' }),
  filter: z.object({
    createdOn: z.object({
      sinceDate: z.string(),
      dueDate: z.string(),
    }).nullable().default(null),
  }).nullable().default(null),
  searchValue: z.string().default(''),
});

type ValidatedData = z.infer<typeof schema>;
type Request = {
  params: {
    id: string;
  }
};

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const isUserExists = await userService.exists({ _id: ctx.request.params.id });
  
  ctx.assertError(isUserExists, 'User not found');
  
  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const {
    perPage, page, sort, searchValue, filter,
  } = ctx.validatedData;

  const { id } = ctx.request.params;

  const validatedSearch = searchValue.split('\\').join('\\\\').split('.').join('\\.');
  const regExp = new RegExp(validatedSearch, 'gi');

  const products = await productService.find(
    {
      authorId: id,
    },
    { page, perPage },
    { sort },
  );

  ctx.body = {
    items: products.results,
    totalPages: products.pagesCount,
    count: products.count,
  };
}

export default (router: AppRouter) => {
  router.get('/:id', validator, validateMiddleware(schema), handler);
};
