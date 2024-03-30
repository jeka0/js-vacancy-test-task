import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from 'react-query';
import { showNotification } from '@mantine/notifications';
import Head from 'next/head';
import { NextPage } from 'next';
import { Button, TextInput, Stack, Title } from '@mantine/core';

import { productApi } from 'resources/product';

import { handleError } from 'utils';

import classes from './index.module.css';

const schema = z.object({
  title: z.string().min(1, 'Please enter title').max(100),
  price: z.number(),
});

type CreateParams = z.infer<typeof schema>;

const Product: NextPage = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateParams>({
    resolver: zodResolver(schema),
  });

  const {
    mutate: create,
    isLoading: isUpdateLoading,
  } = productApi.useCreate<CreateParams>();

  const onSubmit = (submitData: CreateParams) => create(submitData, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(['created-product'], data);
      showNotification({
        title: 'Success',
        message: 'Your product has been successfully created.',
        color: 'green',
      });
    },
    onError: (e) => handleError(e, setError),
  });

  return (
    <>
      <Head>
        <title>Create product</title>
      </Head>
      <Stack
        w={408}
        m="auto"
        pt={48}
        gap={32}
      >
        <Title order={1}>Create new product</Title>

        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack gap={20}>
            <TextInput
              {...register('title')}
              label="Title"
              placeholder="Title"
              labelProps={{
                'data-invalid': !!errors.title,
              }}
              error={errors.title?.message}
            />

            <TextInput
              {...register('price', { valueAsNumber: true })}
              label="Price"
              placeholder="Price"
              labelProps={{
                'data-invalid': !!errors.price,
              }}
              error={errors.price?.message}
            />
          </Stack>

          <Button
            type="submit"
            loading={isUpdateLoading}
          >
            Upload Product
          </Button>
        </form>
      </Stack>
    </>
  );
};

export default Product;
