import { useMutation } from 'react-query';

import { apiService } from 'services';
import { Cart } from 'types';

export function useCreate() {
  const create = (data: { userId:string }) => apiService.post('/cart/create', data);
  return useMutation<Cart, unknown, { userId:string }>(create);
}

export function useGet() {
  const get = (data: { userId:string }) => apiService.get('/cart', data);
  return useMutation<Cart, unknown, { userId:string }>(get);
}

export function useUpdate() {
  const update = (params:{
    userId:string,
    data: { cart?:Array<string>, history?:Array<string> }
  }) => apiService.put(`/cart/${params.userId}`, params.data);
  return useMutation<Cart, unknown, {
    userId:string,
    data: {
      cart?:Array<string>,
      history?:Array<string>
    } }>(update);
}

export function useAddRecord() {
  const update = (params:{
    userId:string,
    recordId:string
  }) => apiService.put(`/cart/add/${params.userId}`, { recordId: params.recordId });
  return useMutation<Cart, unknown, { userId:string, recordId:string }>(update);
}

export function useRemoveRecord() {
  const update = (params:{
    userId:string,
    recordId:string
  }) => apiService.put(`/cart/remove/${params.userId}`, { recordId: params.recordId });
  return useMutation<Cart, unknown, { userId:string, recordId:string }>(update);
}
