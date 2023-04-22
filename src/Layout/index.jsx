import { ThemeProvider, createTheme, useTheme } from '@mui/material';
import './index.css';
import React, { createContext, useEffect, useState } from 'react'
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
    const [emp, setEmp] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (emp === null) {
            localStorage.removeItem('emp');
            return navigate('login');
        }
        if (emp !== null) {
            localStorage.setItem('emp', JSON.stringify(emp));
            return navigate('dashboard');
        }
    }, [emp]);

    return (
        <ThemeProvider theme={theme}>
            <Outlet context={[emp, setEmp]} />
        </ThemeProvider>
    );
}

export default Layout