import { routeUtil } from 'utils';

import list from './actions/list';
import update from './actions/update';
import remove from './actions/remove';
import create from './actions/create';
import uploadImage from './actions/upload-image';
import listAuth from './actions/listAuthor';

const publicRoutes = routeUtil.getRoutes([

]);

const privateRoutes = routeUtil.getRoutes([
  list,
  listAuth,
  update,
  remove,
  create,
  uploadImage,
]);

const adminRoutes = routeUtil.getRoutes([
  list,
  listAuth,
  update,
  remove,
  create,
  uploadImage,
]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
