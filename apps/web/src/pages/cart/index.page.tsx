import { useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { Button, Title } from '@mantine/core';
import classes from './index.module.css';
import MainCart from './cartMain';
import { useCart } from './cartContext';
import CartTables from './cartTables';

const CartPage: NextPage = () => {
  const [isMain, setIsMain] = useState<boolean>(true);
  const { count } = useCart();

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <div className={classes.stack}>
        <div className={classes.navigation}>
          <Button
            className={classes.navBut}
            style={{ color: isMain ? 'black' : 'rgba(0, 0, 0, 0.484)' }}
            onClick={() => setIsMain(true)}
          >
            <Title order={4}>
              My Cart
            </Title>
          </Button>
          <Button
            className={classes.navBut}
            style={{ color: !isMain ? 'black' : 'rgba(0, 0, 0, 0.484)' }}
            onClick={() => setIsMain(false)}
          >
            <Title order={4}>
              History
            </Title>
          </Button>
        </div>
        {count === 0 ? <MainCart /> : <CartTables isMain={isMain} />}
      </div>
    </>
  );
};

export default CartPage;
