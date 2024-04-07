import { useCallback } from 'react';
import Head from 'next/head';
import router from 'next/router';
import { NextPage } from 'next';
import { Stack, Title, Text, Button, Image } from '@mantine/core';
import { RoutePath } from 'routes';
import classes from './index.module.css';

const PaySuccess: NextPage = () => {
  const handleClick = useCallback(() => {
    router.push(RoutePath.Cart);
  }, []);

  return (
    <>
      <Head>
        <title>Payment Successfull</title>
      </Head>
      <Stack
        m="auto"
        w="60vh"
        h="80vh"
        justify="center"
        display="flex"
      >
        <div className={classes.area}>
          <Image
            visibleFrom="sm"
            alt="Success logo"
            src="/images/success.png"
            h="100px"
            right={0}
            style={{ objectFit: 'contain' }}
          />
          <Title order={2}>Payment Successfull</Title>

          <Text mx={0} mt={20} mb={24} c="gray.6">
            Hooray, you have completed your payment!
          </Text>

          <Button
            size="sm"
            className={classes.backButton}
            type="submit"
            onClick={handleClick}
          >
            Back to Cart
          </Button>
        </div>
      </Stack>
    </>
  );
};

export default PaySuccess;
