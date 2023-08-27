import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Main from './Layout/Main'
import Home from './Pages/Home'
import ErrorPage from './Pages/ErrorPage'
import AddATask from './Pages/AddATask'
import AllTask from './Pages/AllTask'
import MyTasks from './Pages/MyTasks'
import AuthProvider from './Provider/AuthProvider'




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
        element: <AddATask></AddATask>
      },
      {
        path: '/allTask',
        element: <AllTask></AllTask>,
        loader: () => fetch('https://mohite-task-minhajul9.vercel.app/tasks')
      },
      {
        path: '/myTasks',
        element: <MyTasks></MyTasks>
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
