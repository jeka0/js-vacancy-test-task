import { z } from 'zod';

import { AppKoaContext, Next, AppRouter, Template, User, Product } from 'types';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'app-constants';

import { userService } from 'resources/user';

import { validateMiddleware } from 'middlewares';
import { analyticsService, emailService } from 'services';
import { securityUtil } from 'utils';

import config from 'config';
import productService from '../product.service';

const schema = z.object({
  title: z.string(),
  price: z.number(),
});

interface ValidatedData extends z.infer<typeof schema> {
  product: Product;
}

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { title } = ctx.validatedData;
  //console.log(userService.findOne({ email }))
  /*const isProductExists = await productService.exists({ title });

  ctx.assertClientError(!isProductExists, {
    email: 'User with this email is already registered',
  });
  */
  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const {
    title,
    price,
  } = ctx.validatedData;

  const product = await productService.insertOne({
    title,
    price,
    isSold: false,
  });
  /*await emailService.sendTemplate<Template.VERIFY_EMAIL>({
    to: user.email,
    subject: 'Please Confirm Your Email Address for Ship',
    template: Template.VERIFY_EMAIL,
    params: {
      firstName: user.firstName,
      href: `${config.API_URL}/account/verify-email?token=${signupToken}`,
    },
  });*/

  ctx.body = { product };
}

export default (router: AppRouter) => {
  router.post('/create', validateMiddleware(schema), validator, handler);
};
