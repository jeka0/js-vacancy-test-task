import { memo } from 'react';
import { Badge } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';

import classes from './index.module.css';

const ShoppingCart = (props: { count: number }) => {
  const { count } = props;
  return (
    <div className={classes.icon}>
      <IconShoppingCart size={30} style={{ marginTop: 6 }} />
      <Badge
        color="blue"
        style={{
          marginTop: 0,
          marginBottom: 'auto',
          marginLeft: -14,
          padding: 6,
          borderRadius: 99999,
        }}
        className={classes.counter}
      >
        {count}
      </Badge>
    </div>
  );
};

export default memo(ShoppingCart);
