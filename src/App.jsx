import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import About from './pages/About';
import ProductPage from './pages/product/ProductPage';
import CategoryPage from './pages/category/CategoryPage';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '/product',
      element: <ProductPage />,
    },
    {
      path: '/category',
      element: <CategoryPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}
