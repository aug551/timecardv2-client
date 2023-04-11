import './index.css';
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material';
import { EmployeeContext } from '../Layout';
import axios from 'axios';

const Dashboard = () => {
    const { emp, setEmp } = useContext(EmployeeContext);
    const [shifts, setShifts] = useState(null);

    useEffect(() => {
        axios.post('http://localhost:4000/emp/shifts', {
            empId: emp.empid
        })
            .then(result => {
                setShifts(result.data);
            })
            .catch(error => {
                console.log(error.message);
            })


    }, []);

    function showShiftsTable() {
        if (shifts == null) {
            return <>Null</>
        }

        return <>{shifts.length}</>
    }

    function logOut() {
        localStorage.removeItem('emp');
        setEmp(null);
    }

    return (
        <>
            {showShiftsTable()}
            <Button variant='contained' onClick={() => logOut()}>Log out</Button>
        </>
    )
}

export default Dashboard