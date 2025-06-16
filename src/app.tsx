import Header from './presentation/components/header/Header';
import Footer from './presentation/components/footer/Footer';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Env } from './shared/constants/Environment';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

 function app() {

  document.title = Env.pageTitle;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 0
      },
      mutations: {
        retry: 0
      }
    }
  });

  const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

  return (
    <ThemeProvider theme={darkTheme}>
    <QueryClientProvider client={queryClient}>
      <ToastContainer position='top-right' hideProgressBar theme='colored' />
      <div className='d-flex flex-column min-vh-100'>
      <Header />
      <section className='container'>
        <Outlet />
      </section>
      <Footer />
      </div>
    </QueryClientProvider>
    </ThemeProvider>
  )
}

export default app
