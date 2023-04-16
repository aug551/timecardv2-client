import './index.css'
import React, { useContext, useState } from 'react'
import { EmployeeContext } from '../Layout'
import { Alert, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate, useOutletContext } from 'react-router-dom';

const Login = () => {
    // const { setEmp } = useContext(EmployeeContext);
    const [emp, setEmp] = useOutletContext();
    const [pwReq, setPwReq] = useState(false);
    const [alerts, setAlerts] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let empId = e.target.empId.value;

        if (pwReq && e.target.adminPw.value == "") {
            setAlerts((prev) => [
                ...prev,
                <Alert severity='error'>Please enter a password to login.</Alert>
            ]);
        }

        try {
            const response = await axios.post(
                "http://localhost:4000/emp/login/",
                {
                    empId: empId.toString()
                }
            );

            if (response.status == 200) {
                let emp = response.data;

                if (emp.ismanager) {
                    // Show password field
                    setPwReq(true);
                }
                else {
                    setEmp(emp);
                    localStorage.setItem('emp', JSON.stringify(emp));
                }
            }
        }
        catch (error) {
            console.error(error.message);
        }
    }

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