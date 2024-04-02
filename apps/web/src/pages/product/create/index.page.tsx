import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from 'react-query';
import Head from 'next/head';
import { NextPage } from 'next';
import { Button, TextInput, Stack } from '@mantine/core';

import { productApi } from 'resources/product';
import { accountApi } from 'resources/account';
import { handleError } from 'utils';
import PhotoUpload from '../components/PhotoUpload';

import classes from './index.module.css';

const schema = z.object({
  title: z.string().min(1, 'Please enter title').max(100),
  price: z.number(),
  imageUrl: z.string(),
  authorId: z.string(),
});

type CreateParams = z.infer<typeof schema>;

const CreateProduct: NextPage = () => {
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState();
  const { data: account } = accountApi.useGet();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
  } = useForm<CreateParams>({
    resolver: zodResolver(schema),
  });
  const {
    mutate: create,
  } = productApi.useCreate<CreateParams>();

  useEffect(() => {
    if (imageUrl)setValue('imageUrl', imageUrl);
  }, [imageUrl, setValue]);

  useEffect(() => {
    if (account)setValue('authorId', account._id);
  }, [account, setValue]);
  const onSubmit = (submitData: CreateParams) => create(submitData, {
    onSuccess: (data) => {
      queryClient.setQueryData(['created-product'], data);
      window.history.back();
    },
    onError: (e) => handleError(e, setError),
  });

  return (
    <>
      <Head>
        <title>Create new product</title>
      </Head>
      <Stack
        w="56%"
      >
        <h3>Create new product</h3>
        <PhotoUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack gap={10}>
            <TextInput
              {...register('title')}
              label="Title of the product"
              placeholder="Enter title of the product..."
              size="36"
              labelProps={{
                'data-invalid': !!errors.title,
              }}
              error={errors.title?.message}
            />

            <TextInput
              {...register('price', { valueAsNumber: true })}
              label="Price"
              placeholder="Enter price of the product..."
              size="36"
              labelProps={{
                'data-invalid': !!errors.price,
              }}
              error={errors.price?.message}
            />
          </Stack>

          <Button
            style={{ width: 180, fontSize: 14, height: 40, borderRadius: 10, marginLeft: 'auto' }}
          >
            Upload Product
          </Button>
        </form>
      </Stack>
    </>
  );
};

export default CreateProduct;
