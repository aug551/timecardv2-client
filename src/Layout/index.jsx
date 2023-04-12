import { ThemeProvider, createTheme, useTheme } from '@mui/material';
import './index.css';
import React, { createContext, useEffect, useState } from 'react'
import LoginPage from '../LoginPage'
import Dashboard from '../Dashboard';
import { Outlet, useNavigate } from 'react-router-dom';

export const EmployeeContext = createContext();

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#ec3d38'
        },
        secondary: {
            main: '#333'
        }
    }
})

const Layout = () => {
    const [emp, setEmp] = useState(JSON.parse(localStorage.getItem('emp')));
    const navigate = useNavigate();

    useEffect(() => {
        renderHomepage();
    }, [emp]);

    function renderHomepage() {
        return (emp == null) ? navigate('/login') : navigate('/dashboard');
    }

    return (
        <ThemeProvider theme={theme}>
            <Outlet context={[emp, setEmp]} />
        </ThemeProvider>
    );
}

export default Layout