import { useMutation } from 'react-query';

import { apiService } from 'services';

export function useGetSession() {
  const get = (data: { userId:string }) => apiService.post('/session', data);
  return useMutation<{ sessionId:string }, unknown, { userId:string }>(get);
}
