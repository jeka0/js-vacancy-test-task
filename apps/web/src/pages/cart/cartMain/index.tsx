import { useCallback } from 'react';
import router from 'next/router';
import { Title, Text, Button, Image } from '@mantine/core';
import { RoutePath } from 'routes';
import classes from './index.module.css';

const MainCart = () => {
  const handleClick = useCallback(() => {
    router.push(RoutePath.Marketplace);
  }, []);

  return (
    <div className={classes.area}>
      <Image
        visibleFrom="sm"
        alt="Success logo"
        src="/images/empty.png"
        h="200px"
        right={0}
        style={{ objectFit: 'contain' }}
      />
      <Title mt={40} order={2}>Oops, there&apos;s nothing here yet!</Title>

      <Text mx={0} mt={20} mb={0} c="gray.6">
        You haven&apos;t made any purchases yet.
      </Text>
      <Text mx={0} mt={0} mb={24} c="gray.6">
        Go to the matketplace and make purhases.
      </Text>

      <Button
        size="sm"
        className={classes.backButton}
        type="submit"
        onClick={handleClick}
      >
        Go to Marketplace
      </Button>
    </div>
  );
};

export default MainCart;
