import _ from 'lodash';

import { Cart } from 'types';
import { cartSchema } from 'schemas';
import { DATABASE_DOCUMENTS } from 'app-constants';

import db from 'db';

const service = db.createService<Cart>(DATABASE_DOCUMENTS.CARTS, {
  schemaValidator: (obj) => cartSchema.parseAsync(obj),
});



export default Object.assign(service);
