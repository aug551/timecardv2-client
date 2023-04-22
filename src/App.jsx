import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import { CssBaseline } from '@mui/material';
import Layout from './Layout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './LoginPage';
import Dashboard from './Dashboard';
import PasswordReset from './PasswordReset';

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
