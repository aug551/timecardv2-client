import './index.css'
import React, { useContext } from 'react'
import { EmployeeContext } from '../Layout'
import { Button, TextField } from '@mui/material';
import axios from 'axios';

const Login = () => {
    const { setEmp } = useContext(EmployeeContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let empId = e.target.empId.value;

        try {
            const response = await axios.post(
                "http://localhost:4000/emp/login/",
                {
                    empId
                }
            );

            if (response.status == 200) {
                console.log(response.data);
                setEmp(response.data);
                localStorage.setItem('emp', JSON.stringify(response.data));
            }
        }
        catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} id="loginForm">
                <h1>Restaurant KIKU</h1>
                <TextField sx={{ width: '100%' }} id="empId" label="Employee ID (ex. 12)" variant='outlined' autoComplete='off' />
                <Button sx={{ width: '100%', height: '2.7rem', fontSize: '1.33rem' }} variant="contained" type='submit' id="loginBtn">Login</Button>
            </form>
        </>
    )
}

export default Login