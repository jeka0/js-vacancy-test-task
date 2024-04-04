import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { Stack } from '@mantine/core';
import { Link } from 'components';
import { RoutePath } from 'routes';
import { productApi } from 'resources/product';
import { accountApi } from 'resources/account';
import { IconCirclePlus } from '@tabler/icons-react';
import { Product } from 'types';
import ProductView from './productView';

import classes from './index.module.css';

const ProductPG: NextPage = () => {
  const { data: account } = accountApi.useGet();
  const [myProducts, setMyProducts] = useState<Array<Product>>([]);

  const {
    mutate: getProducts,
  } = productApi.useGetMyProducts();

  const update = useCallback(() => {
    if (account) {
      getProducts(account._id, {
        onSuccess: (res) => {
          setMyProducts(res.items);
        },
      });
    }
  }, [account, getProducts]);

  useEffect(() => {
    update();
  }, [update]);

  const showList = () => myProducts.map((product) => (
    <ProductView
      data={product}
      update={update}
      showControlls
    />
  ));

  return (
    <>
      <Head>
        <title>My products</title>
      </Head>
      <Stack
        w="100%"
        style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
      >
        <div className={classes.addarea}>
          <Link type="router" href={RoutePath.CreateProduct} underline={false}>
            <div className={classes.addarea}>
              <IconCirclePlus size={42} />
              <h3 style={{ margin: 0 }}>New Product</h3>
            </div>
          </Link>
        </div>
        {showList()}
      </Stack>
    </>
  );
};

export default ProductPG;
