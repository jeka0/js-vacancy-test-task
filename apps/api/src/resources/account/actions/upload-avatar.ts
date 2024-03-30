import multer from '@koa/multer';

import { Next, AppKoaContext, AppRouter } from 'types';

import { userService } from 'resources/user';

import { firebase } from 'services';

const upload = multer();

async function validator(ctx: AppKoaContext, next: Next) {
  const { file } = ctx.request;

  ctx.assertClientError(file, { global: 'File cannot be empty' });

  await next();
}

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;
  const { file } = ctx.request;
  await firebase.uploadFileToStorage(file);
  const url = await firebase.getImageUrl(file.originalname);
  const updatedUser = await userService.updateOne(
    { _id: user._id },
    () => ({ avatarUrl: url }),
  );

  ctx.body = userService.getPublic(updatedUser);
}

export default (router: AppRouter) => {
  router.post('/avatar', upload.single('file'), validator, handler);
};
