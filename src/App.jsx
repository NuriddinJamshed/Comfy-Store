import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/layout';
import Home from './pages/home';
import About from './pages/about';
import Products from './pages/products';
import Info from './pages/info';


const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Layout/>,
      children:[
        {
          index: true,
          element: <Home/>
        },
        {
          path:"products",
          element:<Products/>
        },
        {
          path:"products/:id",
          element:<Info/>
        },
        {
          path:"about",
          element:<About/>
        }
      ]
    }
  ])
  return (
    <>
     <RouterProvider router={router}/> 
    </>
  )
}

export default App