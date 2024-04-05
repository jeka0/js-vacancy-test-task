import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Button, Title, Group } from '@mantine/core';
import { Record } from 'types';
import classes from './index.module.css';
import { useCart } from '../cartContext';
import CartTable from './cartTable';

const CartTables = (props: { isMain:boolean }) => {
  const { isMain } = props;
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { cartData } = useCart();

  useEffect(() => {
    setTotalPrice(0);
    cartData?.cartArray.forEach((record: Record) => {
      setTotalPrice((prevCount) => prevCount + record.product.price);
    });
  }, [cartData]);

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <Group className={classes.group}>
        <div className={classes.tableArea}>
          {isMain ? <CartTable cartArray={cartData?.cartArray} /> : null}
        </div>
        <div className={classes.summaryArea}>
          {isMain
            ? (
              <div className={classes.summary}>
                <Title order={3}>Summary</Title>
                <hr className={classes.line} />
                <div className={classes.priceArea}>
                  <label className={classes.priceTitle}>Total price</label>
                  <Title className={classes.priceValue} order={5}>
                    $
                    {totalPrice}
                  </Title>
                </div>
                <Button size="sm" className={classes.sumBut}>Procced to Checkout</Button>
              </div>
            )
            : null}
        </div>
      </Group>
    </>
  );
};

export default CartTables;
