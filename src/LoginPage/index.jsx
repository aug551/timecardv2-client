import './index.css'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const Login = () => {
    const [emp, setEmp] = useOutletContext();
    const [pwReq, setPwReq] = useState(false);

    const [alerts, setAlerts] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [timeouts, setTimeouts] = useState([]);
    const alertsRef = useRef(alerts);
    alertsRef.current = alerts;
    // Time alert displays
    const alertTimeoutTime = 8000;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Set values to submit
        const empId = e.target.empId.value.toString();
        const password = e.target.adminPw.value;
        let loginUrl = "http://localhost:4000/emp/login";
        let payload = { empId };

        try {
            // If it's admin set the values for admin
            if (pwReq) {
                if (password == "") {
                    // Alert if pw is empty
                    return createAlert(<Alert key={new Date().getTime()} severity='error'>Please enter a password to login.</Alert>);
                }

                loginUrl = "http://localhost:4000/admin/login";
                payload = { empId, password };
            }

            // Submits login information
            const empRes = await submitLogin(loginUrl, payload);
            // Redo the function if it's a manager (require password)
            if (empRes.requirePwd) return setPwReq(true);

            // Invalid Account error
            if (empRes == 204)
                return createAlert(<Alert key={new Date().getTime()} severity='error'>Invalid account information.</Alert>)

            return setEmp(empRes);
        }
        catch (error) {
            console.log("error!!")
            console.error(error.response);
        }
    }

    async function submitLogin(url, payload) {
        try {
            const response = await axios.post(url, payload);
            if (response.status == 200) {
                return response.data;
            }
            return response.status;
        }
        catch (err) {
            throw err;
        }
    }


    function createAlert(alert) {
        setAlerts((prev) => [...prev, alert]);
        setUpdated(true);
    }

    useEffect(() => {
        if (updated == true) {
            setUpdated(false);

            // Handle Alerts
            if (alerts.length > 0) {
                setTimeouts(prev => [
                    ...prev,
                    setTimeout(() => {
                        setAlerts(alertsRef.current.slice(1));
                    }, 8000)
                ]);
            }
        }

        return () => {
            timeouts.forEach(to => clearTimeout(to));
        }

    }, [alerts]);


    return (
        <>
            {alerts}
            <form onSubmit={handleSubmit} id="loginForm">
                <h1>Restaurant KIKU</h1>
                <TextField sx={{ width: '100%' }} id="empId" label="Employee ID (ex. 12)" variant='outlined' autoComplete='off' />
                <TextField sx={{
                    width: '100%',
                    display: (pwReq) ? "inline-flex" : "none",
                }}
                    error={pwReq}
                    helperText="Password is required for admin"
                    id="adminPw"
                    type='password'
                    label="Password"
                    variant='outlined'
                    autoComplete='off'
                />
                <Button sx={{ width: '100%', height: '2.7rem', fontSize: '1.33rem' }} variant="contained" type='submit' id="loginBtn">Login</Button>
            </form>
        </>
    )
}

export default Login