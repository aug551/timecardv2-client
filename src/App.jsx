import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import { CssBaseline } from '@mui/material';
import Layout from './Layout';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './LoginPage';
import Dashboard from './Dashboard';
import PasswordReset from './PasswordReset';
import Admin from './Admin';
import Employees from './Admin/Employees';

const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  children: [
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'dashboard',
      element: <Dashboard />
    },
    {
      path: 'password-reset',
      element: <PasswordReset />
    },
    {
      path: 'admin-page',
      element: <Admin />,
      children: [
        {
          path: 'employees',
          element: <Employees />
        },
        {
          path: 'shifts',
          element: <>Shifts</>
        },
        {
          path: 'reports',
          element: <>Reports</>
        },
        {
          path: '*',
          element: <Navigate to="employees" replace />
        }
      ]
    }
  ]
}])

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
