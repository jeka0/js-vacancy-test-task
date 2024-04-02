import multer from '@koa/multer';

import { Next, AppKoaContext, AppRouter } from 'types';

import { firebase } from 'services';

const upload = multer();

async function validator(ctx: AppKoaContext, next: Next) {
  const { file } = ctx.request;

  ctx.assertClientError(file, { global: 'File cannot be empty' });

  await next();
}

async function handler(ctx: AppKoaContext) {
  const { file } = ctx.request;
  await firebase.uploadFileToStorage(file);
  const url = await firebase.getImageUrl(file.originalname);

  ctx.body = { imageUrl: url };
}

export default (router: AppRouter) => {
  router.post('/image', upload.single('file'), validator, handler);
};
