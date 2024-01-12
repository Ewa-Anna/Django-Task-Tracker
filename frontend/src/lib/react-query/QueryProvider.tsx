import {ReactNode} from 'react'
import { QueryClientProvider,QueryClient } from 'react-query'


const queryClient= new QueryClient()
export const QueryProvider = ({children}:{children:ReactNode}) => {


  return (
  <QueryClientProvider client={queryClient}>
{children}
  </QueryClientProvider>
  )
}

