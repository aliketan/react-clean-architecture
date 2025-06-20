import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router';
import { router } from './presentation/routing/Routes';
import './presentation/theme/scss/app.scss';


createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}></RouterProvider>
)
