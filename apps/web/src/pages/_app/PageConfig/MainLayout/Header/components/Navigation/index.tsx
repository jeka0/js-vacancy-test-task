import { memo } from 'react';
import { Button } from '@mantine/core';
import { Link } from 'components';
import { RoutePath } from 'routes';
import cx from 'clsx';

import classes from './index.module.css';

const buttonStyle = {
  borderRadius: 9999,
  fontSize: 16,
  paddingLeft: 20,
  paddingRight: 20,
  height: 34,
  marginRight: 10,
  marginLeft: 10,
};
const Navigation = (props:{ rout:string }) => {
  const { rout } = props;
  return (
    <div className={classes.container}>
      <Link type="router" href={RoutePath.Home} underline={false}>
        <Button
          className={cx(
            classes.buttonLinkUse,
            { [classes.buttonLink]: true },
          )}
          style={buttonStyle}
        >
          Marketplace
        </Button>
      </Link>
      <Link type="router" href={RoutePath.Product} underline={false}>
        <Button
          className={cx(
            classes.buttonLinkUse,
            { [classes.buttonLink]: rout !== 'product' },
          )}
          style={buttonStyle}
        >
          Your product
        </Button>
      </Link>
    </div>
  );
};

export default memo(Navigation);
