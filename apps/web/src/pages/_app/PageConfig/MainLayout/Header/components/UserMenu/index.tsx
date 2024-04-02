import { memo, FC, useState } from 'react';
import { IconLogout } from '@tabler/icons-react';
import { accountApi } from 'resources/account';
import ShoppingCart from '../ShoppingCart';

import classes from './index.module.css';

const UserMenu: FC = () => {
  const { mutate: signOut } = accountApi.useSignOut();
  const [itemCount, setItemCount] = useState(1);

  setItemCount(1);

  return (
    <div className={classes.menu}>
      <ShoppingCart count={itemCount} />
      <IconLogout size={36} style={{ marginLeft: 20 }} onClick={() => signOut()} />
    </div>
  );
};

export default memo(UserMenu);
