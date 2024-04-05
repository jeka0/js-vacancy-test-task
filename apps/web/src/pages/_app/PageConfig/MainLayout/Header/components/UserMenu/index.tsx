import { memo } from 'react';
import { IconLogout } from '@tabler/icons-react';
import { accountApi } from 'resources/account';
import { Link } from 'components';
import { RoutePath } from 'routes';
import { useCart } from 'pages/cart/cartContext';
import ShoppingCart from '../ShoppingCart';

import classes from './index.module.css';

const UserMenu = (props:{ rout:string }) => {
  const { rout } = props;
  const { mutate: signOut } = accountApi.useSignOut();
  const { count } = useCart();

  return (
    <div className={classes.menu}>
      <Link type="router" href={RoutePath.Cart} underline={false}>
        <ShoppingCart color={rout !== 'cart' ? 'black' : 'rgb(71, 120, 255)'} count={count} />
      </Link>
      <IconLogout
        size={36}
        style={{ marginLeft: 20 }}
        onClick={() => signOut()}
      />
    </div>
  );
};

export default memo(UserMenu);
