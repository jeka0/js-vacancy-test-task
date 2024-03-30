import multer from '@koa/multer';

import { Next, AppKoaContext, AppRouter } from 'types';

import { userService } from 'resources/user';

import { firebase } from 'services';

async function handler(ctx: AppKoaContext) {
  const { fileName } = ctx.params;
  const url = await firebase.getImageUrl(fileName);

  ctx.body = { url };
}

export default (router: AppRouter) => {
  router.get('/avatar/:fileName', handler);
};
