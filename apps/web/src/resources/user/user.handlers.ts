import queryClient from 'query-client';
import { apiService } from 'services';

apiService.on('error', (error: any) => {
  if (error.status === 401) {
    queryClient.setQueryData(['account'], null);
  }
});
