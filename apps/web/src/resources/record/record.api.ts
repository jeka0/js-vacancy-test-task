import { useMutation } from 'react-query';

import { Record } from 'types';

import { apiService } from 'services';

export function useCreate() {
  const create = (data: { productId:string }) => apiService.post('/record/create', data);
  return useMutation<Record, unknown, { productId:string }>(create);
}

export function useGet() {
  const get = (data: { id:string }) => apiService.get('/record', data);
  return useMutation<Record, unknown, { id:string }>(get);
}

export function useDelete() {
  const deleteRec = (id: string) => apiService.delete(`/record/${id}`);
  return useMutation<{}, unknown, string>(deleteRec);
}

export function useIncrement() {
  const update = (params:{
    id:string,
    quantity:number
  }) => apiService.put(`/record/${params.id}`, { quantity: params.quantity + 1 });
  return useMutation<Record, unknown, { id:string, quantity:number }>(update);
}

export function useDecrement() {
  const update = (params:{
    id:string,
    quantity:number
  }) => apiService.put(`/record/${params.id}`, { quantity: params.quantity - 1 });
  return useMutation<Record, unknown, { id:string, quantity:number }>(update);
}

export function useUpdate() {
  const update = (params:{
    id:string,
    data: { quantity?:number, isSold?:boolean }
  }) => apiService.put(`/record/${params.id}`, params.data);
  return useMutation<Record, unknown, {
    id:string,
    data: {
      quantity?:number,
      isSold?:boolean
    } }>(update);
}
