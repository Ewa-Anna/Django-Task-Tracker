import {ReactNode} from 'react'
import { QueryClientProvider,QueryClient } from 'react-query'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
export const QueryProvider = ({children}:{children:ReactNode}) => {


  return (
  <QueryClientProvider client={queryClient}>
{children}
  </QueryClientProvider>
  )
}

