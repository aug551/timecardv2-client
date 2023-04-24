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
    const [emp, setEmp] = useState(JSON.parse(localStorage.getItem('emp')));
    const navigate = useNavigate();

    useEffect(() => {
        let navigateLocation = "login";

        if (emp === null) {
            localStorage.removeItem('emp');
            navigateLocation = 'login';
        }

        if (emp !== null) {
            localStorage.setItem('emp', JSON.stringify(emp));
            navigateLocation = (emp.ismanager) ? 'admin-page/employees' : 'dashboard'
        }

        navigate(navigateLocation);

    }, [emp]);

    return (
        <ThemeProvider theme={theme}>
            <Outlet context={[emp, setEmp]} />
        </ThemeProvider>
    );
}

export default Layout