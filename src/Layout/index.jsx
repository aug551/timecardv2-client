import { ThemeProvider, createTheme, useTheme } from '@mui/material';
import './index.css';
import React, { createContext, useEffect, useState } from 'react'
import LoginPage from '../LoginPage'
import Dashboard from '../Dashboard';
import { Navigate } from 'react-router-dom';

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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loggedEmp = localStorage.getItem('emp');
        if (loggedEmp) {
            setEmp(loggedEmp);
        }
        setIsLoading(false);
    });

    function renderHomepage() {
        if (!isLoading)
            return (emp == null) ? <LoginPage /> : <Dashboard />;

    }

    return (
        <ThemeProvider theme={theme}>
            <EmployeeContext.Provider value={{ emp, setEmp }}>
                {renderHomepage()}
            </EmployeeContext.Provider>
        </ThemeProvider>
    );
}

export default Layout