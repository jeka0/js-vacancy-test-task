import { useMutation } from 'react-query';

import { Product } from 'types';

import { apiService } from 'services';

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
