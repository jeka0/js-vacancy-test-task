import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import { NextPage } from 'next';
import {
  Group,
  Title,
  NumberInput,
  Stack,
  CloseButton,
  Button,
  TextInput,
  UnstyledButton,
  Flex,
  Pagination,
} from '@mantine/core';
import {
  IconSearch,
  IconX, IconCircleXFilled,
  IconArrowsDownUp,
  IconChevronDown,
  IconChevronUp,
} from '@tabler/icons-react';
import { useInputState } from '@mantine/hooks';
import { productApi } from 'resources/product';
import { ValidatedData } from 'resources/product/product.api';
import { Product } from 'types';
import ProductView from 'pages/product/productView';

import classes from './index.module.css';

const Marketplace: NextPage = () => {
  const [from, setFrom] = useState<number | string>('');
  const [to, setTo] = useState<number | string>('');
  const [search, setSearch] = useInputState('');
  const [page, setPage] = useState<number>(1);
  const [ascSort, setAscSort] = useState<boolean>(true);
  const [list, setList] = useState<{
    items: Array<Product>,
    totalPages: number,
    count: number
  } | undefined>(undefined);
  const perPage = '6';

  const handelReset = () => {
    setFrom('');
    setTo('');
  };

  const {
    mutate: getProducts,
  } = productApi.useGetList();

  const changeSort = () => {
    setAscSort(!ascSort);
  };

  const getList = useCallback(() => {
    const data: ValidatedData = {
      page: page.toString(),
      perPage,
      searchValue: search,
      sort: {
        createdOn: ascSort ? 'asc' : 'desc',
      },
      filter: {
        price: {
          fromPrice: null,
          toPrice: null,
        },
      },
    };
    if (data.filter?.price) {
      if (from !== '')data.filter.price.fromPrice = from.toString();
      if (to !== '')data.filter.price.toPrice = to.toString();
    }
    getProducts(data, {
      onSuccess: (productslist) => {
        setList(productslist);
        if (productslist.totalPages < page)setPage(productslist.totalPages);
      },
      onError: (err) => console.log(err),
    });
  }, [page, search, to, from, ascSort, getProducts]);

  useEffect(() => {
    getList();
  }, [page, search, to, from, ascSort, getList]);

  const showList = () => list?.items.map((product) => (
    <ProductView
      data={product}
      update={() => {}}
      showControlls={false}
      addButton
    />
  ));

  return (
    <>
      <Head>
        <title>Marketplace</title>
      </Head>
      <Group className={classes.area}>
        <div className={classes.filterArea}>
          <div className={classes.filterContainer}>
            <div className={classes.title}>
              <Title size={20} style={{ marginLeft: 20 }}>Filters</Title>
              <Button
                variant="default"
                size="compact-xs"
                onClick={handelReset}
                style={{ opacity: 0.5, border: 'none', marginLeft: 'auto' }}
              >
                Reset All
                {' '}
                <CloseButton />
              </Button>
            </div>
            <Stack className={classes.filter}>
              <Title
                size={16}
                style={{
                  marginLeft: 20, marginTop: 5, marginBottom: 0,
                }}
              >
                Price
              </Title>
              <Group style={{ display: 'flex', justifyContent: 'center' }}>
                <NumberInput
                  suffix="$"
                  leftSection="From:"
                  className={classes.input}
                  hideControls
                  value={from}
                  onChange={setFrom}
                />
                <NumberInput
                  suffix="$"
                  leftSection="To:"
                  className={classes.input}
                  hideControls
                  value={to}
                  onChange={setTo}
                />
              </Group>
            </Stack>
          </div>
        </div>
        <Stack className={classes.contentArea}>
          <TextInput
            w="80%"
            size="md"
            value={search}
            onChange={setSearch}
            placeholder="Type yo search..."
            leftSection={<IconSearch size={16} />}
            rightSection={search ? (
              <UnstyledButton
                component={Flex}
                display="flex"
                align="center"
                onClick={() => setSearch('')}
              >
                <IconX color="gray" />
              </UnstyledButton>
            ) : null}
          />
          <div className={classes.controls}>
            <div className={classes.sort}>
              <Title size="16">
                {list?.count}
                {' '}
                results
              </Title>
              <Button
                size="16"
                variant="default"
                className={classes.sortLable}
                onClick={changeSort}
              >
                <IconArrowsDownUp size="20" style={{ marginRight: 5 }} />
                {ascSort ? 'Sorted by oldest' : 'Sorted by newest'}
                {ascSort ? <IconChevronUp /> : <IconChevronDown />}
              </Button>
            </div>
            {from && to
               && (
               <div className={classes.tag}>
                 <Group gap="xs">
                   <label>
                     $
                     {from}
                     -$
                     {to}
                   </label>
                   <IconCircleXFilled
                     size="24"
                     style={{ color: 'rgb(81, 81, 81)' }}
                     onClick={handelReset}
                   />
                 </Group>
               </div>
               )}
          </div>
          <Stack gap="xl" className={classes.list}>
            {showList()}
          </Stack>
          {list
            ? (
              <Pagination
                total={list?.totalPages}
                value={page}
                onChange={setPage}
                mt="sm"
              />
            )
            : <div />}
        </Stack>

      </Group>
    </>
  );
};

export default Marketplace;
