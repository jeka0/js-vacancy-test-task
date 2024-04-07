import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { Button, Title, Group } from '@mantine/core';
import { Record } from 'types';
import { stripeApi } from 'resources/stripe';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { accountApi } from 'resources/account';
import { useCart } from '../cartContext';
import { public_key } from '../../../config/stripeConfig.json';
import classes from './index.module.css';
import CartTable from './cartTable';
import HistoryTable from './historyTable';

const CartTables = (props: { isMain:boolean }) => {
  const { isMain } = props;
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [sessionId, setSessionId] = useState<string>();
  const { cartData } = useCart();
  const router = useRouter();
  const asyncStripe = loadStripe(public_key);
  const { data: account } = accountApi.useGet();
  const {
    mutate: get,
  } = stripeApi.useGetSession();
  const counter = useCallback(() => {
    setTotalPrice(0);
    cartData?.cartArray.forEach((record: Record) => {
      setTotalPrice((prevCount) => prevCount + record.product.price * record.quantity);
    });
  }, [cartData]);

  useEffect(() => {
    counter();
  }, [counter]);

  useEffect(() => {
    if (sessionId) {
      asyncStripe.then((stripe) => {
        if (stripe) {
          return stripe.redirectToCheckout({ sessionId });
        }
        return null;
      }).then((res) => {
        if (res?.error) {
          router.push('/pay/error');
        }
      });
    }
  }, [sessionId, asyncStripe, router]);

  const handler = async () => {
    try {
      if (account) {
        get({ userId: account._id }, {
          onSuccess: (res) => setSessionId(res.sessionId),
        });
      }
    } catch (err) {
      console.log(err);
      router.push('/pay/error');
    }
  };
  const showTables = () => {
    if (cartData) {
      if (isMain) { return (<CartTable cartArray={cartData.cartArray} count={counter} />); }
      return (<HistoryTable historyArray={cartData.historyArray} />);
    }
    return null;
  };
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <Group className={classes.group}>
        <div className={classes.tableArea}>
          {showTables()}
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
                <Button
                  size="sm"
                  className={classes.sumBut}
                  onClick={handler}
                >
                  Procced to Checkout
                </Button>
              </div>
            )
            : null}
        </div>
      </Group>
    </>
  );
};

export default CartTables;
