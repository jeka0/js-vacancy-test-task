import { routeUtil } from 'utils';

import session from './session';
import webhook from './webhook';

const publicRoutes = routeUtil.getRoutes([
  session,
  webhook,
]);

const privateRoutes = routeUtil.getRoutes([

]);

const adminRoutes = routeUtil.getRoutes([

]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
