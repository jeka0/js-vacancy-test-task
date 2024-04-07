import { routeUtil } from 'utils';
import create from './actions/create';
import get from './actions/get';
import update from './actions/update';
import remove from './actions/remove';

const publicRoutes = routeUtil.getRoutes([

]);

const privateRoutes = routeUtil.getRoutes([
  create,
  get,
  update,
  remove,
]);

const adminRoutes = routeUtil.getRoutes([
  
]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
