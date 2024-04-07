import { z } from 'zod';
import { useMutation } from 'react-query';

import { Product } from 'types';

import { apiService } from 'services';

const schema = z.object({
  page: z.string().default('1'),
  perPage: z.string().default('10'),
  sort: z.object({
    createdOn: z.enum(['asc', 'desc']),
  }).default({ createdOn: 'desc' }),
  filter: z.object({
    price: z.object({
      fromPrice: z.string().nullable().default(null),
      toPrice: z.string().nullable().default(null),
    }).nullable().default(null),
  }).nullable().default(null),
  searchValue: z.string().default(''),
});

export type ValidatedData = z.infer<typeof schema>;

export function useGetList() {
  const getProducts = (data: ValidatedData) => apiService.get('/products', data);
  return useMutation<{
    items: Array<Product>,
    totalPages: number,
    count: number
  }, unknown, ValidatedData>(getProducts);
}

export function useCreate<T>() {
  const create = (data: T) => apiService.post('/products/create', data);
  return useMutation<Product, unknown, T>(create);
}

export function useUploadImage<T>() {
  const uploadImage = (data: T) => apiService.post('/products/image', data);
  return useMutation<{ imageUrl: string }, unknown, T>(uploadImage);
}

export function useGetMyProducts() {
  const getProducts = (id: string) => apiService.get(`/products/${id}`);
  return useMutation<{
    items: Array<Product>,
    totalPages: number,
    count: number
  }, unknown, string>(getProducts);
}

export function useDeleteProducts() {
  const deleteProduct = (id: string) => apiService.delete(`/products/${id}`);
  return useMutation<{}, unknown, string>(deleteProduct);
}
