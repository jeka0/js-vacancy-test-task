import { useMutation } from 'react-query';

import { Product } from 'types';

import { apiService } from 'services';

export function useCreate<T>() {
  const create = (data: T) => apiService.post('/products/create', data);
  return useMutation<Product, unknown, T>(create);
}
