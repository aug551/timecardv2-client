import './index.css'
import React, { useContext } from 'react'
import { EmployeeContext } from '../Layout'
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate, useOutletContext } from 'react-router-dom';

const Login = () => {
    // const { setEmp } = useContext(EmployeeContext);
    const [emp, setEmp] = useOutletContext();

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
                setEmp(response.data);
                localStorage.setItem('emp', JSON.stringify(response.data));
                // navigate('/dashboard');
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