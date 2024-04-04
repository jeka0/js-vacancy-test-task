import { z } from 'zod';

import { AppKoaContext, AppRouter } from 'types';

import { productService } from 'resources/product';

import { validateMiddleware } from 'middlewares';

const schema = z.object({
  page: z.string().transform(Number).default('1'),
  perPage: z.string().transform(Number).default('10'),
  sort: z.object({
    createdOn: z.enum(['asc', 'desc']),
  }).default({ createdOn: 'desc' }),
  filter: z.object({
    price: z.object({
      fromPrice: z.string().transform(Number).nullable().default(null),
      toPrice: z.string().transform(Number).nullable().default(null),
    }).nullable().default(null),
  }).nullable().default(null),
  searchValue: z.string().default(''),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const {
    perPage, page, sort, searchValue, filter,
  } = ctx.validatedData;

  const validatedSearch = searchValue.split('\\').join('\\\\').split('.').join('\\.');
  const regExp = new RegExp(validatedSearch, 'i');
  const query = { price:{} };
  if (filter?.price?.fromPrice)query.price = { $gte: filter.price.fromPrice };
  if (filter?.price?.toPrice)query.price = { ...query.price, $lt: filter.price.toPrice };
  console.log(filter);
  console.log(query);
  const products = await productService.find(
    {
      $and: [
        {
          title: { $regex: regExp },
        },
        filter?.price ? query : {},
      ],
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
  router.get('/', validateMiddleware(schema), handler);
};
