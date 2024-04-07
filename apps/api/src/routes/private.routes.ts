import mount from 'koa-mount';
import compose from 'koa-compose';

import { AppKoa } from 'types';

import { accountRoutes } from 'resources/account';
import { userRoutes } from 'resources/user';
import { cartRoutes } from 'resources/cart'; 
import { recordRoutes } from 'resources/record';

import auth from './middlewares/auth.middleware';
import { productRoutes } from 'resources/product';

export default (app: AppKoa) => {
  app.use(mount('/account', compose([auth, accountRoutes.privateRoutes])));
  app.use(mount('/users', compose([auth, userRoutes.privateRoutes])));
  app.use(mount('/products', compose([auth, productRoutes.privateRoutes])));
  app.use(mount('/cart', compose([auth, cartRoutes.privateRoutes])));
  app.use(mount('/record', compose([auth, recordRoutes.privateRoutes])));
};
