import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Main from './Layout/Main'
import Home from './Pages/Home'
import ErrorPage from './Pages/ErrorPage'
import AddATask from './Pages/AddATask'
import MyTasks from './Pages/MyTasks'
import AuthProvider from './Provider/AuthProvider'
import PrivateRoute from './Routes/PrivateRoute'




const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/addATask',
        element: <PrivateRoute><AddATask></AddATask></PrivateRoute>
      },
      {
        path: '/myTasks',
        element: <PrivateRoute><MyTasks></MyTasks></PrivateRoute>
      }
    ],
    errorElement: <ErrorPage></ErrorPage>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)
