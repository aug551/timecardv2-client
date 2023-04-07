import { ThemeProvider, createTheme, useTheme } from '@mui/material';
import './index.css';
import React, { useEffect, useState } from 'react'

const theme = createTheme({
    palette: {
        mode: 'light'
    }
})

const Layout = () => {
    const [emp, setEmp] = useState(null);

    useEffect(() => {
        const loggedEmp = localStorage.getItem('emp');
        if (loggedEmp) {
            const foundEmp = JSON.parse(loggedEmp);
            setEmp(foundEmp);
        }
    })

    return (
        <ThemeProvider theme={theme}>
            { }
        </ThemeProvider>
    )
}

export default Layout