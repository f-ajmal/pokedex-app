import { QueryClient } from '@tanstack/react-query';

const queryConfig = {
    defaultOptions: {
      queries: { 
        refetchOnWindowFocus: false, 
        staleTime: 300000, 
        retry: false 
      }
    }
  };

  const queryClient = new QueryClient(queryConfig);

  export default queryClient;