import { routeUtil } from 'utils';

import list from './actions/list';
import update from './actions/update';
import remove from './actions/remove';
import create from './actions/create';

const publicRoutes = routeUtil.getRoutes([

]);

const privateRoutes = routeUtil.getRoutes([
  list,
  update,
  remove,
  create,
]);

const adminRoutes = routeUtil.getRoutes([
  list,
  update,
  remove,
  create,
]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
