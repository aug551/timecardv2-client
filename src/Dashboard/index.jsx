import './index.css';
import React, { useContext } from 'react'
import { Button } from '@mui/material';
import { EmployeeContext } from '../Layout';

const Dashboard = () => {
    const { emp, setEmp } = useContext(EmployeeContext);

    function logOut() {
        localStorage.removeItem('emp');
        setEmp(null);
    }

    return (
        <>
            <Button variant='contained' onClick={() => logOut()}>Log out</Button>
        </>
    )
}

export default Dashboard