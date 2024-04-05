import _ from 'lodash';

import { Cart } from 'types';
import { recordSchema } from 'schemas';
import { DATABASE_DOCUMENTS } from 'app-constants';

import db from 'db';

const service = db.createService<Cart>(DATABASE_DOCUMENTS.RECORDS, {
  schemaValidator: (obj) => recordSchema.parseAsync(obj),
});



export default Object.assign(service);
